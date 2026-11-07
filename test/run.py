"""Browser tests for the built Mayes Core bundle (dist/core.js + dist/core.css).

Run from the repo root after ./build.sh:
    python3 test/run.py
Serves the repo locally, opens test/index.html in headless Chrome at phone and desktop widths,
and exercises business fill, hours, the sheet, bottom nav, consent, announcement offset,
scroll state and motion (with and without GSAP, and with reduced motion), plus the sheet's
GSAP motion and iPhone-safe scroll lock, a Webflow-authored sheet host, the Before and After module,
and the Add to Home Screen banner (iPhone, Android prompt, in-app browser, standalone, desktop).
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

        check("globals present", pg.evaluate("!!(window.CoreSheet && window.CoreConsent && window.CoreBusiness && window.CoreAnnouncement && window.CoreInstall && window.CoreMotion)"))
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

        # ---------- page stability: no vertical bounce on phones ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        pg = ctx.new_page(); pg.goto(base + plain); pg.wait_for_load_state("load")
        check("stability: no vertical overscroll on phones",
              pg.evaluate("getComputedStyle(document.documentElement).overscrollBehaviorY") == "none"
              and pg.evaluate("getComputedStyle(document.body).overscrollBehaviorY") == "none")
        ctx.close()
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        pg = ctx.new_page(); pg.goto(base + plain); pg.wait_for_load_state("load")
        check("stability: desktop scrolling unchanged", pg.evaluate("getComputedStyle(document.documentElement).overscrollBehaviorY") == "auto")
        ctx.close()

        # ---------- safe areas (iPhone notch + home bar, emulated) ----------
        def notched(w, h, insets):
            c = browser.new_context(viewport={"width": w, "height": h}, is_mobile=True, has_touch=True)
            c.add_init_script("localStorage.setItem('core-consent-v1','{}');")
            pg = c.new_page()
            cdp = c.new_cdp_session(pg)
            cdp.send("Emulation.setSafeAreaInsetsOverride", {"insets": insets})
            pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(300)
            return c, pg
        px = lambda pg, sel, prop: pg.evaluate(f"parseFloat(getComputedStyle(document.querySelector('{sel}'))['{prop}'])")
        # landscape: notch on the left and right, home bar at the bottom
        ctx, pg = notched(844, 390, {"left": 47, "right": 47, "top": 0, "bottom": 21})
        check("safe area: page content clear of the notch", px(pg, "body", "paddingLeft") == 47 and px(pg, "body", "paddingRight") == 47)
        check("safe area: header clear of the notch", px(pg, "#shell-header", "paddingLeft") == 47 and px(pg, "#shell-header", "paddingRight") == 47)
        check("safe area: bottom nav clear of the notch", px(pg, ".bottom-nav_bar", "paddingLeft") == 47 and px(pg, ".bottom-nav_bar", "paddingRight") == 47)
        pg.evaluate("CoreSheet.open('services', {mode: 'bottom'})"); pg.wait_for_timeout(500)
        check("safe area: sheet content clear of the notch", px(pg, "[data-sheet-host].is-open [data-sheet-body]", "paddingLeft") == 47)
        check("safe area: sheet clear of the home bar", px(pg, "[data-sheet-host].is-open [data-sheet-body]", "paddingBottom") >= 21 + 20)
        pg.evaluate("CoreSheet.close()"); pg.wait_for_timeout(400)
        pg.evaluate("CoreInstall.show(true)"); pg.wait_for_timeout(400)
        check("safe area: install banner clear of the notch", pg.evaluate("document.querySelector('.core-install').getBoundingClientRect().left") >= 47)
        ctx.close()
        # portrait: no side insets, so spacing is unchanged; home bar at the bottom
        ctx, pg = notched(390, 844, {"left": 0, "right": 0, "top": 47, "bottom": 34})
        check("safe area: portrait spacing unchanged", px(pg, "body", "paddingLeft") == 0 and px(pg, ".bottom-nav_bar", "paddingLeft") == 6)
        pg.evaluate("CoreSheet.open('services', {mode: 'left'})"); pg.wait_for_timeout(500)
        check("safe area: side drawer clear of the status bar", px(pg, "[data-sheet-host].is-open [data-sheet-head]", "paddingTop") == 47)
        ctx.close()

        # ---------- Add to Home Screen ----------
        IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
        ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
        INSTA = IPHONE + " Instagram 350.0.0.0"
        CONSENTED = "localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}));"
        BANNER = "document.querySelector('[data-install-banner]')"
        def phone(ua, init=""):
            c = browser.new_context(viewport={"width": 390, "height": 844}, user_agent=ua, is_mobile=True, has_touch=True)
            if init: c.add_init_script(init)
            pg = c.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            return c, pg, errs
        visible = lambda pg: pg.evaluate(f"!!{BANNER} && {BANNER}.classList.contains('is-visible')")

        # iPhone: first view no banner; second view shows it above the bottom nav
        ctx, pg, errors = phone(IPHONE, "if(!sessionStorage.getItem('seeded')){" + CONSENTED + "sessionStorage.setItem('seeded','1');}")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: no banner on first view", not pg.evaluate(f"!!{BANNER}"))
        pg.reload(); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: banner on second view (iPhone)", visible(pg))
        check("install: iOS instructions", pg.get_attribute("[data-install-banner]", "data-install-platform") == "ios" and "Add to Home Screen" in pg.text_content(".core-install_hint"), pg.text_content("[data-install-banner]"))
        check("install: business name used", "Test Plumbing Co." in pg.text_content(".core-install_title"), pg.text_content(".core-install_title"))
        check("install: webclip icon shown", pg.evaluate("!!document.querySelector('.core-install_icon')"))
        check("install: sits above bottom nav", pg.evaluate(f"{BANNER}.getBoundingClientRect().bottom <= document.querySelector('.bottom-nav_bar').getBoundingClientRect().top"),
              pg.evaluate(f"[{BANNER}.getBoundingClientRect().bottom, document.querySelector('.bottom-nav_bar').getBoundingClientRect().top]"))
        check("install: does not take focus", pg.evaluate(f"!{BANNER}.contains(document.activeElement)"))
        pg.click(".core-install_close"); pg.wait_for_timeout(400)
        check("install: close removes banner", not pg.evaluate(f"!!{BANNER}"))
        check("install: close remembered", pg.evaluate("CoreInstall.state().snoozed"))
        pg.reload(); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: stays closed after reload", not pg.evaluate(f"!!{BANNER}"))
        pg.click("#tab-more a"); pg.wait_for_timeout(400)
        check("install: trigger is a button", pg.get_attribute("#install-open", "role") == "button" and pg.get_attribute("#install-open", "href") is None)
        pg.click("#install-open"); pg.wait_for_timeout(900)
        check("install: trigger shows banner even when closed", visible(pg) and not pg.evaluate("CoreSheet.current()"))
        check("install: no JS errors (iPhone)", not errors, errors)
        ctx.close()

        # waits for the cookie notice to be answered
        ctx, pg, errors = phone(IPHONE, "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: waits while cookie notice is open", not pg.evaluate(f"!!{BANNER}") and pg.evaluate("CoreSheet.current() && CoreSheet.current().getAttribute('data-sheet') === 'cookie-notice'"))
        pg.click("#necessary"); pg.wait_for_timeout(2400)
        check("install: shows after consent answered", visible(pg))
        check("install: no JS errors (consent)", not errors, errors)
        ctx.close()

        # cookie notice closed without a choice: still shows (v1.0.1 fix)
        ctx, pg, errors = phone(IPHONE, "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3000)
        pg.evaluate("CoreSheet.close()"); pg.wait_for_timeout(1500)
        check("install: shows when cookie notice closed without a choice", visible(pg) and not pg.evaluate("!!localStorage.getItem('core-consent-v1')"))
        ctx.close()

        # no consent saved and no cookie notice on the page: still shows
        ctx, pg, errors = phone(IPHONE, "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));"
            "document.addEventListener('DOMContentLoaded', () => { const n = document.querySelector('[data-sheet=\"cookie-notice\"]'); if (n) n.remove(); });")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3600)
        check("install: shows with no cookie notice on the page", visible(pg))
        check("install: no JS errors (no notice)", not errors, errors)
        ctx.close()

        # Android with the browser's install prompt
        ctx, pg, errors = phone(ANDROID, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load")
        pg.evaluate("""() => { const e = new Event('beforeinstallprompt', {cancelable: true});
            e.prompt = () => { window.__prompted = true; }; e.userChoice = Promise.resolve({outcome: 'accepted'});
            window.dispatchEvent(e); }""")
        pg.wait_for_timeout(3500)
        check("install: Android prompt shows Install button", visible(pg) and pg.evaluate("!!document.querySelector('[data-install-action=prompt]')"))
        pg.click("[data-install-action=prompt]"); pg.wait_for_timeout(500)
        check("install: Install opens browser prompt", pg.evaluate("window.__prompted === true"))
        check("install: accepted hides banner", not pg.evaluate(f"!!{BANNER}"))
        check("install: no JS errors (Android)", not errors, errors)
        ctx.close()

        # Instagram in-app browser
        ctx, pg, errors = phone(INSTA, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: in-app browser told to open in browser", pg.get_attribute("[data-install-banner]", "data-install-platform") == "in-app" and "browser" in pg.text_content(".core-install_hint"))
        ctx.close()

        # already opened from the home screen
        ctx, pg, errors = phone(IPHONE, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:5})); Object.defineProperty(navigator, 'standalone', {value: true});")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: never shown when standalone", not pg.evaluate(f"!!{BANNER}") and pg.evaluate("document.documentElement.classList.contains('is-standalone')"))
        check("install: trigger hidden when standalone", pg.evaluate("getComputedStyle(document.getElementById('install-open')).display") == "none")
        ctx.close()

        # desktop: nothing
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        ctx.add_init_script(CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:5}));")
        pg = ctx.new_page(); pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: no banner on desktop", not pg.evaluate(f"!!{BANNER}"))
        check("install: trigger hidden on desktop", pg.evaluate("document.getElementById('install-open').hidden"))
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
