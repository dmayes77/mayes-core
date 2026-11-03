"""Browser tests for the built Mayes Core bundle (dist/core.js + dist/core.css).

Run from the repo root after ./build.sh:
    python3 test/run.py
Serves the repo locally, opens test/index.html in headless Chrome at phone and desktop widths,
and exercises business fill, hours, the sheet, bottom nav, consent, announcement offset,
scroll state and motion (with and without GSAP, and with reduced motion), plus the sheet's
GSAP motion and iPhone-safe scroll lock, a Webflow-authored sheet host, and the Before and After module.
"""
import http.server, os, socketserver, sys, threading, tempfile, shutil
from functools import partial
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8765
failures = []

def check(name, ok, detail=""):
    print(("PASS " if ok else "FAIL ") + name + (f"  ({detail})" if detail and not ok else ""))
    if not ok: failures.append(name)

def make_page(gsap_paths=None):
    """Write a variant of test/index.html with the consent head snippet (and optionally GSAP) inlined."""
    src = open(os.path.join(ROOT, "test/index.html")).read()
    head = open(os.path.join(ROOT, "dist/core-consent-head.html")).read()
    gsap = "".join(f'<script src="{p}"></script>' for p in (gsap_paths or []))
    name = "_gsap.html" if gsap_paths else "_plain.html"
    out = src.replace("<!--CONSENT_HEAD-->", head).replace("<!--GSAP-->", gsap).replace("/test/index.html", "/test/" + name)
    open(os.path.join(ROOT, "test", name), "w").write(out)
    return f"/test/{name}"

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

def serve():
    handler = partial(Quiet, directory=ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd

def run():
    httpd = serve()
    plain = make_page()
    gsap_dir = os.path.join(ROOT, "test/node_modules/gsap/dist")
    gsap = make_page(["/test/node_modules/gsap/dist/gsap.min.js", "/test/node_modules/gsap/dist/ScrollTrigger.min.js"]) if os.path.isdir(gsap_dir) else None
    base = f"http://127.0.0.1:{PORT}"
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])

        # ---------- phone, no GSAP ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844})
        pg = ctx.new_page()
        errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and not m.text.startswith("Failed to load resource") and errors.append(m.text))
        pg.on("response", lambda r: r.status >= 400 and errors.append(f"{r.status} {r.url}"))
        pg.goto(base + plain); pg.wait_for_load_state("load")

        check("globals present", pg.evaluate("!!(window.CoreSheet && window.CoreConsent && window.CoreBusiness && window.CoreAnnouncement && window.CoreMotion)"))
        check("phone filled", pg.text_content("#phone") == "(423) 555-0100", pg.text_content("#phone"))
        check("phone link", pg.get_attribute("#phone", "href") == "tel:4235550100", pg.get_attribute("#phone", "href"))
        check("email link", pg.get_attribute("#email", "href") == "mailto:hello@example.com")
        check("address computed", pg.text_content("#address") == "100 Market St, Chattanooga TN 37402", pg.text_content("#address"))
        check("directions fallback", (pg.get_attribute("#directions", "href") or "").startswith("https://www.google.com/maps/search/"))
        check("empty logo keeps fallback", pg.get_attribute("#logo", "src").startswith("data:image/gif"))
        check("empty field hidden on request", pg.evaluate("document.getElementById('tagline').hidden"))
        rows = pg.eval_on_selector_all("#hours [data-business-hours-line]", "els => els.map(e => [...e.children].map(c => c.textContent).join(' | '))")
        check("hours grouped", rows == ["Monday – Friday | 8 AM–5 PM", "Saturday | 9 AM–1 PM", "Sunday | Closed"], rows)
        today = pg.text_content("#today")
        check("today line", today.startswith("Open today") or today == "Closed today", today)

        check("home tab active", pg.evaluate("document.getElementById('tab-home').classList.contains('is-active')"))
        check("home tab aria-current", pg.get_attribute("#tab-home a", "aria-current") == "page")
        check("sheet tab has aria-haspopup", pg.get_attribute("#tab-services a", "aria-haspopup") == "dialog")
        check("zero badge hidden", pg.evaluate("document.getElementById('badge').classList.contains('is-empty')"))
        pg.evaluate("document.getElementById('badge').textContent = '2'"); pg.wait_for_timeout(100)
        check("badge counted in label", pg.get_attribute("#tab-click a", "aria-label") == "Book, 2 items", pg.get_attribute("#tab-click a", "aria-label"))
        check("html.has-bottom-nav", pg.evaluate("document.documentElement.classList.contains('has-bottom-nav')"))

        # cookie notice appears ~1.2s after first visit
        pg.wait_for_timeout(1500)
        check("cookie notice opens on first visit", pg.evaluate("CoreSheet.current() && CoreSheet.current().getAttribute('data-sheet') === 'cookie-notice'"))
        pg.click("#accept-all"); pg.wait_for_timeout(400)
        saved = pg.evaluate("JSON.parse(localStorage.getItem('core-consent-v1'))")
        check("accept-all saved", bool(saved and saved["analytics"] and saved["marketing"]), saved)
        check("consent update sent to gtag", pg.evaluate("__gtagCalls.some(c => c[0]==='consent' && c[1]==='update' && c[2].analytics_storage==='granted')"))

        # bottom sheet from a tab (opened while scrolled down, to test the scroll lock)
        pg.evaluate("window.scrollTo(0, 300)"); pg.wait_for_timeout(100)
        pg.click("#tab-services a"); pg.wait_for_timeout(400)
        host = "[data-sheet-host]"
        check("services sheet open", pg.evaluate(f"document.querySelector('{host}').classList.contains('is-open')"))
        check("bottom presentation on phone", pg.get_attribute(host, "data-sheet-as") == "bottom", pg.get_attribute(host, "data-sheet-as"))
        check("height attribute mirrored", pg.get_attribute(host, "data-sheet-height") == "medium")
        check("focus moved into sheet", pg.evaluate(f"document.querySelector('{host}').contains(document.activeElement)"))
        check("page behind is inert", pg.evaluate("document.querySelector('main').closest('[inert]') !== null || document.querySelector('main').hasAttribute('inert') || [...document.body.children].some(e => e.contains(document.querySelector('main')) && e.hasAttribute('inert'))"))
        check("scroll locked", pg.evaluate("document.documentElement.classList.contains('sheet-lock')"))
        check("body pinned (iPhone-safe lock)", pg.evaluate("document.body.style.position === 'fixed' && document.body.style.top === '-300px'"), pg.evaluate("[document.body.style.position, document.body.style.top]"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        check("Escape closes", not pg.evaluate(f"document.querySelector('{host}').classList.contains('is-open')"))
        check("scroll position restored", pg.evaluate("window.scrollY") == 300 and pg.evaluate("document.body.style.position") == "", pg.evaluate("window.scrollY"))
        check("focus returned to tab", pg.evaluate("document.activeElement === document.querySelector('#tab-services a')"))
        check("content block restored", pg.evaluate("document.querySelector('[data-sheet=\"services\"]').contains(document.getElementById('svc-first'))"))

        # click: action
        pg.click("#tab-click a"); pg.wait_for_timeout(400)
        check("click: action opens target", pg.evaluate("CoreSheet.current() && CoreSheet.current().getAttribute('data-sheet') === 'services'"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)

        # consent switches via More
        pg.click("#tab-more a"); pg.wait_for_timeout(400)
        check("switch reflects saved choice", pg.get_attribute("#sw-analytics", "aria-checked") == "true")
        pg.click("#sw-marketing"); pg.click("#save"); pg.wait_for_timeout(400)
        saved = pg.evaluate("JSON.parse(localStorage.getItem('core-consent-v1'))")
        check("save writes switch state", saved["analytics"] is True and saved["marketing"] is False, saved)

        # announcement + scroll state
        pg.evaluate("window.scrollTo(0, 0)"); pg.wait_for_timeout(200)
        off = pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--core-announcement-offset').trim()")
        check("announcement offset = bar height", off == "40px", off)
        pg.evaluate("window.scrollTo(0, 400)"); pg.wait_for_timeout(300)
        check("offset 0 after scroll", pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--core-announcement-offset').trim()") == "0px")
        check("scroll state class", pg.evaluate("document.getElementById('nav').classList.contains('is-scrolled')"))
        check("no-GSAP: motion content visible", pg.evaluate("getComputedStyle(document.getElementById('rise')).opacity") == "1")
        check("no JS errors (phone)", not errors, errors)
        ctx.close()

        # ---------- desktop ----------
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        pg = ctx.new_page(); errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.goto(base + plain); pg.wait_for_load_state("load")
        pg.evaluate("localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}))")
        pg.click("#open-services"); pg.wait_for_timeout(400)
        check("center dialog on desktop", pg.get_attribute("[data-sheet-host]", "data-sheet-as") == "center", pg.get_attribute("[data-sheet-host]", "data-sheet-as"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        pg.click("#open-right"); pg.wait_for_timeout(400)
        check("data-sheet-open-mode overrides", pg.get_attribute("[data-sheet-host]", "data-sheet-as") == "right", pg.get_attribute("[data-sheet-host]", "data-sheet-as"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        pg.click("#tab-more a"); pg.wait_for_timeout(400)
        check("tab data-tab-sheet-mode overrides", pg.get_attribute("[data-sheet-host]", "data-sheet-as") == "bottom", pg.get_attribute("[data-sheet-host]", "data-sheet-as"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        check("block mode restored after override", pg.evaluate("CoreSheet.open('services'), document.querySelector('[data-sheet-host]').getAttribute('data-sheet-as')") == "center")
        pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
        check("no JS errors (desktop)", not errors, errors)
        ctx.close()

        # ---------- with GSAP ----------
        if gsap:
            for reduced in (False, True):
                ctx = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce" if reduced else "no-preference")
                ctx.add_init_script("localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}))")
                pg = ctx.new_page(); errors = []
                pg.on("pageerror", lambda e: errors.append(str(e)))
                pg.goto(base + gsap); pg.wait_for_load_state("load"); pg.wait_for_timeout(1500)
                label = "reduced motion" if reduced else "GSAP"
                check(f"{label}: gsap loaded", pg.evaluate("!!window.gsap"))
                check(f"{label}: rise ends visible", pg.evaluate("getComputedStyle(document.getElementById('rise')).opacity") == "1")
                check(f"{label}: stagger items end visible", pg.evaluate("[...document.querySelectorAll('#stagger [data-motion-item]')].every(e => getComputedStyle(e).opacity === '1')"))
                H = "document.querySelector('[data-sheet-host]')"
                pg.click("#tab-services a"); pg.wait_for_timeout(60)
                animating = pg.evaluate(f"{H}.classList.contains('is-gsap')")
                check(f"{label}: sheet motion {'skipped' if reduced else 'runs on GSAP'}", animating == (not reduced), animating)
                pg.wait_for_timeout(500)
                check(f"{label}: sheet opens", pg.evaluate(f"{H}.classList.contains('is-open') && {H}.classList.contains('is-visible')"))
                check(f"{label}: panel at rest after open", pg.evaluate(f"{H}.querySelector('[data-sheet-panel]').style.transform === '' && !{H}.classList.contains('is-gsap')"))
                pg.keyboard.press("Escape"); pg.wait_for_timeout(60)
                if not reduced:
                    check("GSAP: close animates before hiding", pg.evaluate(f"{H}.classList.contains('is-open') && CoreSheet.top() === null"))
                pg.wait_for_timeout(450)
                check(f"{label}: sheet closed", not pg.evaluate(f"{H}.classList.contains('is-open')"))
                check(f"{label}: content restored", pg.evaluate("document.querySelector('[data-sheet=\"services\"]').contains(document.getElementById('svc-first'))"))
                # reopen while the close is still animating: must end open, not closed
                pg.evaluate("CoreSheet.open('services')"); pg.wait_for_timeout(400)
                pg.evaluate("CoreSheet.close(); CoreSheet.open('location')"); pg.wait_for_timeout(600)
                check(f"{label}: reopen during close ends open", pg.evaluate(f"{H}.classList.contains('is-open') && CoreSheet.current() && CoreSheet.current().getAttribute('data-sheet') === 'location'"))
                check(f"{label}: services content back home", pg.evaluate("document.querySelector('[data-sheet=\"services\"]').contains(document.getElementById('svc-first'))"))
                pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
                check(f"{label}: no JS errors", not errors, errors)
                ctx.close()
        else:
            print("SKIP GSAP tests (run: npm install --prefix test gsap)")

        # ---------- Webflow-authored sheet host ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844})
        pg = ctx.new_page(); errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.goto(base + "/test/authored.html"); pg.wait_for_load_state("load")
        check("authored: one host, adopted", pg.evaluate("document.querySelectorAll('[data-sheet-host]').length") == 1)
        check("authored: moved to <body>", pg.evaluate("document.querySelector('[data-sheet-host]').parentNode === document.body"))
        check("authored: aria-hidden removed", pg.evaluate("!document.querySelector('[data-sheet-host]').hasAttribute('aria-hidden')"))
        check("authored: placeholder cleared", "Slot placeholder" not in pg.text_content("[data-sheet-host]"))
        check("authored: close link is a button", pg.get_attribute("#authored-close", "role") == "button" and pg.get_attribute("#authored-close", "href") is None)
        pg.click("#open-location"); pg.wait_for_timeout(400)
        check("authored: opens with content", pg.evaluate("document.querySelector('.sheet_body').contains(document.getElementById('loc-text'))"))
        check("authored: title set", pg.text_content(".sheet_title") == "Location", pg.text_content(".sheet_title"))
        check("authored: Webflow classes kept while open", pg.evaluate("document.querySelector('[data-sheet-host]').classList.contains('sheet_component')"))
        pg.click("#authored-close"); pg.wait_for_timeout(400)
        check("authored: close link closes", not pg.evaluate("document.querySelector('[data-sheet-host]').classList.contains('is-open')"))
        check("authored: Webflow classes kept after close", pg.evaluate("document.querySelector('[data-sheet-host]').className") == "sheet_component")
        check("authored: no JS errors", not errors, errors)
        ctx.close()

        # ---------- Before and After (optional module) ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844})
        pg = ctx.new_page(); errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.goto(base + "/test/before-after.html"); pg.wait_for_load_state("load")
        pos = lambda: pg.evaluate("getComputedStyle(document.getElementById('ba')).getPropertyValue('--pos').trim()")
        check("before/after: starts at 50%", pos() == "50%", pos())
        pg.fill("#range", "30"); pg.wait_for_timeout(50)
        check("before/after: input moves split", pos() == "30%", pos())
        pg.focus("#range"); pg.keyboard.press("ArrowRight"); pg.wait_for_timeout(50)
        check("before/after: keyboard moves split", pos() == "31%", pos())
        check("before/after: missing photo shows placeholder", pg.evaluate("getComputedStyle(document.getElementById('ph-after')).display") == "grid")
        check("before/after: present photo hides placeholder", pg.evaluate("getComputedStyle(document.getElementById('ph-before')).display") == "none")
        pg.evaluate("document.getElementById('later').innerHTML = document.getElementById('ba').outerHTML.replace('id=\"ba\"','id=\"ba2\"').replace(/data-ba-ready=\"1\"/,''); CoreBeforeAfter.init(document.getElementById('later'))")
        check("before/after: init() wires later sliders", pg.get_attribute("#ba2", "data-ba-ready") == "1")
        check("before/after: no JS errors", not errors, errors)
        ctx.close()

        browser.close()
    httpd.shutdown()
    for name in ("_plain.html", "_gsap.html"):
        path = os.path.join(ROOT, "test", name)
        if os.path.exists(path): os.remove(path)
    print(f"\n{'All browser tests passed.' if not failures else str(len(failures)) + ' failed: ' + ', '.join(failures)}")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(run())
