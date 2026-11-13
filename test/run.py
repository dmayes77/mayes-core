"""Browser tests for the built Mayes Core bundle (dist/core.js + dist/core.css).

Run from the repo root after ./build.sh:
    python3 test/run.py
Serves the repo locally and opens test/index.html (the master in miniature: Webflow's classes are in
test/webflow.css) in headless Chrome at phone and desktop widths. Exercises Core v3: business fill, hours
and JSON-LD, native sheets (Webflow Modals: open by name, events, backdrop tap, swipe down to close, slide and
backdrop from core-base.css, scroll lock, reduced motion), consent, the announcement offset, the install banner (iPhone, Android prompt,
in-app browser, standalone, desktop), core-base.css, safe areas and the optional Before and After module.
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

def make_page():
    """Write a variant of test/index.html with the consent head snippet inlined."""
    src = open(os.path.join(ROOT, "test/index.html")).read()
    head = open(os.path.join(ROOT, "dist/core-consent-head.html")).read()
    name = "_plain.html"
    out = src.replace("<!--CONSENT_HEAD-->", head).replace("/test/index.html", "/test/" + name)
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
    base = f"http://127.0.0.1:{PORT}"
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])

        # ---------- phone ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844})
        pg = ctx.new_page()
        errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and not m.text.startswith("Failed to load resource") and errors.append(m.text))
        pg.on("response", lambda r: r.status >= 400 and not r.url.endswith("placeholder.svg") and errors.append(f"{r.status} {r.url}"))
        pg.goto(base + plain); pg.wait_for_load_state("load")
        check("globals present, no retired modules", pg.evaluate("!!(window.CoreSheet && window.CoreConsent && window.CoreBusiness && window.CoreAnnouncement && window.CoreInstall) && !window.CoreMotion && !window.__coreBottomNav"))
        check("versions: Sheet 3.0.0, the rest 2.0.0", pg.evaluate("CoreSheet.version === '3.0.0' && [CoreConsent, CoreBusiness, CoreAnnouncement, CoreInstall].every(m => m.version === '2.0.0')"))
        css = open(os.path.join(ROOT, "dist/core.css")).read()
        rules = css.split("*/", 1)[1] if "*/" in css else css
        import re as _re
        classes = set(_re.findall(r"\.([a-zA-Z][\w-]*)", "".join(_re.split(r"/\*.*?\*/", rules, flags=_re.S))))
        check("core.css styles no Webflow classes", not classes, classes)
        check("phone filled", pg.text_content("#phone") == "(423) 555-0100", pg.text_content("#phone"))
        check("phone link", pg.get_attribute("#phone", "href") == "tel:4235550100", pg.get_attribute("#phone", "href"))
        check("email link", pg.get_attribute("#email", "href") == "mailto:hello@example.com")
        check("address computed", pg.text_content("#address") == "100 Market St, Chattanooga TN 37402", pg.text_content("#address"))
        check("directions fallback", (pg.get_attribute("#directions", "href") or "").startswith("https://www.google.com/maps/search/"))
        check("empty logo keeps fallback", pg.get_attribute("#logo", "src").startswith("data:image/gif"))
        check("empty logo still gets alt text", pg.get_attribute("#logo", "alt") == pg.evaluate("CoreBusiness.get('business-name')"), pg.get_attribute("#logo", "alt"))
        check("empty field hidden on request", pg.evaluate("document.getElementById('tagline').hidden"))
        check("icon link gets href", pg.get_attribute("#social-fb", "href") == "https://facebook.com/test" and not pg.evaluate("document.getElementById('social-fb').hidden"))
        check("empty icon link hidden", pg.evaluate("document.getElementById('social-x').hidden"))
        check("icon link with a URL gets is-business-filled, empty one does not", pg.evaluate("document.getElementById('social-fb').classList.contains('is-business-filled') && !document.getElementById('social-x').classList.contains('is-business-filled')"))
        rows = pg.eval_on_selector_all("#hours [data-business-hours-line]", "els => els.map(e => [...e.children].map(c => c.textContent).join(' | '))")
        check("hours grouped (no designed row: plain rows)", rows == ["Monday – Friday | 8 AM–5 PM", "Saturday | 9 AM–1 PM", "Sunday | Closed"], rows)
        rows = pg.eval_on_selector_all("#hours-designed [data-business-hours-line]", "els => els.map(e => e.className + '|' + [...e.children].map(c => c.className + ':' + c.textContent).join('|'))")
        check("designed hours row cloned with its Webflow classes", rows == ["location_hours-row|location_text:Monday – Friday|location_text:8 AM–5 PM", "location_hours-row|location_text:Saturday|location_text:9 AM–1 PM", "location_hours-row|location_text:Sunday|location_text:Closed"], rows)
        ld = pg.evaluate("JSON.parse(document.getElementById('core-schema').textContent)")
        g = {n["@type"]: n for n in ld["@graph"]}
        biz = g.get("Plumber", {})
        check("schema: one script in head, typed from meta", pg.evaluate("document.querySelectorAll('head #core-schema').length") == 1 and "Plumber" in g, list(g))
        check("schema: business from the data layer", biz.get("name") == "Test Plumbing Co." and biz.get("telephone") == "+14235550100" and biz.get("email") == "hello@example.com", biz)
        check("schema: address", biz.get("address", {}).get("streetAddress") == "100 Market St" and biz["address"].get("postalCode") == "37402", biz.get("address"))
        hrs = biz.get("openingHoursSpecification", [])
        check("schema: hours grouped, 24h, closed days left out", [(h["dayOfWeek"], h["opens"], h["closes"]) for h in hrs] == [(["Monday","Tuesday","Wednesday","Thursday","Friday"],"08:00","17:00"), (["Saturday"],"09:00","13:00")], hrs)
        check("schema: sameAs only filled links", biz.get("sameAs") == ["https://instagram.com/test"], biz.get("sameAs"))
        check("schema: no empty logo", "logo" not in biz and biz.get("areaServed") == "Chattanooga and North Georgia", biz)
        wp = g.get("WebPage", {})
        check("schema: WebPage names this page and links the business", wp.get("name") == "Heading" and wp.get("description") == "Test page description." and wp.get("about", {}).get("@id", "").endswith("/#business"), wp)
        pg.evaluate("CoreBusiness.fill()")
        check("schema: refill does not duplicate", pg.evaluate("document.querySelectorAll('script[type=\"application/ld+json\"]').length") == 1)
        today = pg.text_content("#today")
        check("today line", today.startswith("Open today") or today == "Closed today", today)

        S = lambda n: f"document.querySelector('dialog[data-sheet=\"{n}\"]')"
        is_open = lambda n: pg.evaluate(f"{S(n)}.open && {S(n)}.matches(':modal')")
        R = lambda n: pg.evaluate(f"(() => {{ const r = {S(n)}.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; }})()")
        pg.evaluate("window.__ev = []; ['sheet:open','sheet:close'].forEach(t => document.addEventListener(t, e => __ev.push(t + ':' + e.target.getAttribute('data-sheet'))))")
        check("sheets closed: not displayed, nothing open", pg.evaluate("[...document.querySelectorAll('dialog[data-sheet]')].every(d => !d.open && getComputedStyle(d).display === 'none')") and pg.evaluate("CoreSheet.current() === null"))
        pg.click("#open-empty"); pg.wait_for_timeout(200)
        check("empty data-sheet-open: plain link, no sheet", pg.evaluate("location.hash === '#plain-link' && !CoreSheet.current()"))
        pg.evaluate("history.replaceState(null, '', location.pathname)")
        pg.click("#open-missing"); pg.wait_for_timeout(200)
        check("data-sheet-open with no such sheet: plain link", pg.evaluate("location.hash === '#no-such-sheet' && !CoreSheet.current() && CoreSheet.open('nope') === null"))
        pg.evaluate("history.replaceState(null, '', location.pathname)")
        check("button component: empty behavior attributes leave a plain link", pg.evaluate("""(() => { const a = document.getElementById('cb-plain-link');
            return a.getAttribute('href') === '#cb-target' && !a.hasAttribute('role') && !a.hasAttribute('tabindex'); })()"""))
        pg.evaluate("document.getElementById('cb-plain-link').click()"); pg.wait_for_timeout(200)
        check("button component: empty behavior attributes still navigate", pg.evaluate("location.hash === '#cb-target' && !CoreSheet.current()"))
        pg.evaluate("history.replaceState(null, '', location.pathname)")
        check("button component: consent action link becomes a button", pg.get_attribute("#cb-necessary-link", "role") == "button" and pg.get_attribute("#cb-necessary-link", "href") is None)

        # cookie notice appears ~1.2s after first visit
        pg.wait_for_timeout(1500)
        check("cookie notice opens on first visit, as a modal dialog", is_open("cookie-notice") and pg.evaluate("CoreSheet.current().getAttribute('data-sheet') === 'cookie-notice'"))
        check("sheet:open fired for the cookie notice", "sheet:open:cookie-notice" in pg.evaluate("__ev"), pg.evaluate("__ev"))
        pg.click("#accept-all"); pg.wait_for_timeout(400)
        saved = pg.evaluate("JSON.parse(localStorage.getItem('core-consent-v1'))")
        check("accept-all saved", bool(saved and saved["analytics"] and saved["marketing"]), saved)
        check("consent update sent to gtag", pg.evaluate("__gtagCalls.some(c => c[0]==='consent' && c[1]==='update' && c[2].analytics_storage==='granted')"))
        check("accept-all closes the notice, sheet:close fired", not is_open("cookie-notice") and "sheet:close:cookie-notice" in pg.evaluate("__ev"))

        # bottom sheet from a tab link (opened while scrolled down, to test the scroll lock)
        pg.evaluate("window.scrollTo(0, 300)"); pg.wait_for_timeout(100)
        url = pg.url
        pg.click("#tab-services"); pg.wait_for_timeout(450)
        check("tab link with data-sheet-open opens the sheet (showModal), no navigation", pg.url == url and is_open("services"))
        r = R("services"); cw = pg.evaluate("Math.round(document.body.getBoundingClientRect().width)")   # page width (headless Chrome keeps a scrollbar gutter)
        check("bottom sheet: full width, flush to the bottom, at most 88% tall", r[0] == 0 and r[2] == cw and r[3] == 844 and r[3] - r[1] <= round(844 * 0.88) + 1, r)
        check("sheet slid in (no transform at rest)", pg.evaluate(f"getComputedStyle({S('services')}).transform") in ("none", "matrix(1, 0, 0, 1, 0, 0)"))
        check("backdrop dims the page", pg.evaluate(f"getComputedStyle({S('services')}, '::backdrop').backgroundColor") == "rgba(17, 17, 17, 0.45)")
        check("focus moved into sheet", pg.evaluate(f"{S('services')}.contains(document.activeElement)"))
        check("page behind is inert (native modal)", pg.evaluate("document.elementFromPoint(195, 400) && !document.querySelector('main').contains(document.elementFromPoint(195, 30))"))
        check("scroll locked", pg.evaluate("getComputedStyle(document.documentElement).overflowY === 'hidden' && getComputedStyle(document.body).overflowY === 'hidden'"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(450)
        check("Escape closes, sheet no longer displayed", not is_open("services") and pg.evaluate(f"getComputedStyle({S('services')}).display") == "none")
        check("scroll position kept", pg.evaluate("window.scrollY") == 300, pg.evaluate("window.scrollY"))
        check("focus returned to tab", pg.evaluate("document.activeElement === document.getElementById('tab-services')"))
        check("sheet:open and sheet:close fired for services", all(e in pg.evaluate("__ev") for e in ("sheet:open:services", "sheet:close:services")), pg.evaluate("__ev"))

        # close button, backdrop tap, closedby="none"
        pg.click("#tab-services"); pg.wait_for_timeout(450)
        pg.click("#services-close"); pg.wait_for_timeout(450)
        check("[data-sheet-close] closes, link not followed", not is_open("services") and pg.evaluate("location.hash") == "")
        pg.click("#tab-location"); pg.wait_for_timeout(450)
        r = R("location")
        pg.mouse.click(195, max(10, r[1] - 40)); pg.wait_for_timeout(450)
        check("tap on the backdrop closes", not is_open("location"))
        pg.evaluate(f"{S('location')}.setAttribute('closedby', 'none'); CoreSheet.open('location')"); pg.wait_for_timeout(450)
        pg.mouse.click(195, max(10, R("location")[1] - 40)); pg.wait_for_timeout(300)
        check("closedby=\"none\": backdrop tap does not close", is_open("location"))
        pg.evaluate(f"CoreSheet.close('location'); {S('location')}.setAttribute('closedby', 'any')"); pg.wait_for_timeout(450)

        # one sheet at a time
        pg.evaluate("CoreSheet.open('services')"); pg.wait_for_timeout(300)
        pg.evaluate("CoreSheet.open('location')"); pg.wait_for_timeout(450)
        check("opening a second sheet closes the first", is_open("location") and not is_open("services") and pg.evaluate("CoreSheet.current().getAttribute('data-sheet') === 'location'"))
        pg.evaluate("CoreSheet.close()"); pg.wait_for_timeout(450)
        check("CoreSheet.close() closes the current sheet", pg.evaluate("CoreSheet.current() === null"))

        # swipe down to close
        def swipe(sel, dy, steps=8):
            box = pg.evaluate(f"(() => {{ const r = document.querySelector('{sel}').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }})()")
            pg.mouse.move(box[0], box[1]); pg.mouse.down()
            for i in range(1, steps + 1): pg.mouse.move(box[0], box[1] + dy * i / steps); pg.wait_for_timeout(16)
            mid = pg.evaluate(f"{S('services')}.style.transform")
            pg.mouse.up(); return mid
        pg.click("#tab-services"); pg.wait_for_timeout(450)
        mid = swipe("dialog[data-sheet=services] [data-sheet-grabber]", 30, steps=10)
        pg.wait_for_timeout(300)
        check("short drag follows the finger, then springs back open", mid == "translateY(30px)" and is_open("services") and pg.evaluate(f"{S('services')}.style.transform") == "", mid)
        mid = swipe("dialog[data-sheet=services] .sheet_title", 220)
        pg.wait_for_timeout(450)
        check("swipe down on the head closes", mid == "translateY(220px)" and not is_open("services"), mid)
        check("swipe close leaves no inline styles", pg.evaluate(f"{S('services')}.getAttribute('style') || ''") == '', pg.evaluate(f"{S('services')}.getAttribute('style')"))
        pg.click("#tab-services"); pg.wait_for_timeout(450)
        swipe("dialog[data-sheet=services] .sheet_body a", 220); pg.wait_for_timeout(300)
        check("dragging the body does not close", is_open("services"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(450)

        # motion: the closing sheet stays visible while it slides down (transition-behavior: allow-discrete)
        pg.click("#tab-services"); pg.wait_for_timeout(450)
        check("sheet transition from core-base.css", "0.26s" in pg.evaluate(f"getComputedStyle({S('services')}).transitionDuration"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(60)
        check("close animates before hiding", pg.evaluate(f"getComputedStyle({S('services')}).display") != "none" and not is_open("services"))
        pg.wait_for_timeout(450)
        check("sheet hidden after the slide", pg.evaluate(f"getComputedStyle({S('services')}).display") == "none")

        # consent switches via More
        pg.click("#tab-more"); pg.wait_for_timeout(450)
        cls = lambda sel: pg.evaluate(f"{sel}.className")
        check("More tab opens Site Settings", is_open("site-settings"))
        check("switch reflects saved choice (is-on)", pg.get_attribute("#sw-analytics", "aria-checked") == "true" and "is-on" in cls("document.getElementById('sw-analytics')"))
        check("switch look from Webflow combo", pg.evaluate("getComputedStyle(document.getElementById('sw-analytics')).backgroundColor") == "rgb(0, 128, 0)")
        check("essential switch is-on and is-disabled", all(c in cls("document.getElementById('sw-essential')").split() for c in ("is-on", "is-disabled")))
        check("no data-look marking", not pg.evaluate("!!document.querySelector('[data-look]')"))
        pg.click("#sw-marketing"); pg.click("#save"); pg.wait_for_timeout(450)
        saved = pg.evaluate("JSON.parse(localStorage.getItem('core-consent-v1'))")
        check("save writes switch state and closes the sheet", saved["analytics"] is True and saved["marketing"] is False and not is_open("site-settings"), saved)

        # announcement
        pg.evaluate("window.scrollTo(0, 0)"); pg.wait_for_timeout(200)
        off = pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--core-announcement-offset').trim()")
        check("announcement offset = bar height", off == "40px", off)
        check("header sits under the bar (Webflow class uses the offset)", pg.evaluate("Math.round(document.getElementById('shell-header').getBoundingClientRect().top)") == 40)
        pg.evaluate("window.scrollTo(0, 400)"); pg.wait_for_timeout(300)
        check("offset 0 after scroll", pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--core-announcement-offset').trim()") == "0px")

        # core-base.css
        check("[hidden] wins over a Webflow class display", pg.evaluate("(() => { const b = document.getElementById('banner'); b.classList.add('is-visible'); b.hidden = true; const d = getComputedStyle(b).display; b.hidden = false; b.classList.remove('is-visible'); return d; })()") == "none")
        check("html keeps a stable scrollbar gutter", pg.evaluate("getComputedStyle(document.documentElement).scrollbarGutter") == "stable")
        check("no JS errors (phone)", not errors, errors)
        ctx.close()

        # ---------- desktop ----------
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        pg = ctx.new_page(); errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.add_init_script("localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}))")
        pg.goto(base + plain); pg.wait_for_load_state("load")
        pg.click("#open-services"); pg.wait_for_timeout(450)
        r = R("services"); cw = pg.evaluate("Math.round(document.body.getBoundingClientRect().width)")   # page width (headless Chrome keeps a scrollbar gutter)
        check("desktop: still a bottom sheet, centered, 36rem wide, flush to the bottom", r[2] - r[0] == 576 and abs((r[0] + r[2]) / 2 - cw / 2) <= 1 and r[3] == 800, r)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(450)
        check("no JS errors (desktop)", not errors, errors)
        ctx.close()

        # ---------- reduced motion ----------
        ctx = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        ctx.add_init_script("localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}))")
        pg = ctx.new_page(); errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.goto(base + plain); pg.wait_for_load_state("load")
        pg.click("#tab-services"); pg.wait_for_timeout(60)
        check("reduced motion: no slide", pg.evaluate(f"getComputedStyle({S('services')}).transitionDuration").replace(" ", "").strip(",").split(",")[0] == "0s" and pg.evaluate(f"getComputedStyle({S('services')}).transform") in ("none", "matrix(1, 0, 0, 1, 0, 0)"))
        pg.keyboard.press("Escape"); pg.wait_for_timeout(60)
        check("reduced motion: hidden at once", pg.evaluate(f"getComputedStyle({S('services')}).display") == "none")
        check("reduced motion: no JS errors", not errors, errors)
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
        # v1.1.0: focus ring for keyboard only.
        pg.click("#range"); pg.wait_for_timeout(50)
        check("before/after: tap/click shows no focus ring", not pg.evaluate("document.getElementById('ba').classList.contains('is-focused')"))
        pg.keyboard.press("ArrowLeft"); pg.wait_for_timeout(50)
        check("before/after: keyboard shows focus ring", pg.evaluate("document.getElementById('ba').classList.contains('is-focused')"))
        pg.mouse.down(); pg.mouse.up(); pg.wait_for_timeout(50)
        check("before/after: pointer hides focus ring again", not pg.evaluate("document.getElementById('ba').classList.contains('is-focused')"))
        pg.evaluate("document.getElementById('range').blur()")
        check("before/after: blur removes focus ring", not pg.evaluate("document.getElementById('ba').classList.contains('is-focused')"))
        # v1.1.0: native only. A gsap object on the page is never called; the split is an inline --pos.
        pg.evaluate("window.gsap = {set: function(){ window.__gsapCalled = true; }}")
        pg.fill("#range", "70"); pg.wait_for_timeout(50)
        check("before/after: ignores GSAP, sets --pos inline", pg.evaluate("!window.__gsapCalled && document.getElementById('ba').style.getPropertyValue('--pos') === '70%'"))
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

        # ---------- safe areas (the master's Webflow classes with Core's combos; iPhone notch + home bar emulated) ----------
        def notched(w, h, insets):
            c = browser.new_context(viewport={"width": w, "height": h}, is_mobile=True, has_touch=True)
            c.add_init_script("localStorage.setItem('core-consent-v1','{}');")
            pg = c.new_page()
            cdp = c.new_cdp_session(pg)
            cdp.send("Emulation.setSafeAreaInsetsOverride", {"insets": insets})
            pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(300)
            return c, pg
        px = lambda pg, sel, prop: pg.evaluate(f"parseFloat(getComputedStyle(document.querySelector('{sel}'))['{prop}'])")
        ctx, pg = notched(844, 390, {"left": 47, "right": 47, "top": 0, "bottom": 21})
        check("safe area: page content clear of the notch", px(pg, "body", "paddingLeft") == 47 and px(pg, "body", "paddingRight") == 47)
        check("safe area: header clear of the notch", px(pg, "#shell-header", "paddingLeft") == 47 and px(pg, "#shell-header", "paddingRight") == 47)
        check("safe area: bottom nav clear of the notch", px(pg, ".bottom-nav_bar", "paddingLeft") == 47 and px(pg, ".bottom-nav_bar", "paddingRight") == 47)
        pg.evaluate("CoreSheet.open('services')"); pg.wait_for_timeout(500)
        content_left = pg.evaluate("(() => { const b = document.querySelector('dialog[data-sheet=services] .sheet_body'); return b.getBoundingClientRect().left; })()")
        check("safe area: sheet content clear of the notch", content_left >= 47, content_left)
        body_bottom = pg.evaluate("document.querySelector('dialog[data-sheet=services] .sheet_body').getBoundingClientRect().bottom")
        check("safe area: sheet clear of the home bar", body_bottom <= 390 - 21, body_bottom)
        pg.evaluate("CoreSheet.close(null, {instant: true})"); pg.wait_for_timeout(100)
        pg.evaluate("CoreInstall.show(true)"); pg.wait_for_timeout(400)
        check("safe area: install banner clear of the notch", pg.evaluate("document.getElementById('banner').getBoundingClientRect().left") >= 47)
        ctx.close()
        ctx, pg = notched(390, 844, {"left": 0, "right": 0, "top": 47, "bottom": 34})
        check("safe area: portrait spacing unchanged", px(pg, "body", "paddingLeft") == 0 and px(pg, ".bottom-nav_bar", "paddingLeft") == 6)
        pg.evaluate("CoreSheet.open('services')"); pg.wait_for_timeout(500)
        bottom_pad = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('dialog[data-sheet=services] .sheet_panel')).paddingBottom)")
        check("safe area: bottom sheet padded above the home bar", bottom_pad >= 34, bottom_pad)
        pg.evaluate("CoreSheet.close(null, {instant: true}); document.querySelector('[data-bottom-nav]').remove(); CoreInstall.show(true)"); pg.wait_for_timeout(400)
        check("install: no bottom nav → offset removed, banner clears the home bar", pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--core-install-offset').trim()") == "" and pg.evaluate("Math.round(844 - document.getElementById('banner').getBoundingClientRect().bottom)") == 34 + 12)
        ctx.close()

        # ---------- Add to Home Screen ----------
        IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
        ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36"
        INSTA = IPHONE + " Instagram 350.0.0.0"
        CONSENTED = "localStorage.setItem('core-consent-v1', JSON.stringify({analytics:false,marketing:false}));"
        BANNER = "document.getElementById('banner')"
        def phone(ua, init=""):
            c = browser.new_context(viewport={"width": 390, "height": 844}, user_agent=ua, is_mobile=True, has_touch=True)
            if init: c.add_init_script(init)
            pg = c.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            return c, pg, errs
        visible = lambda pg: pg.evaluate(f"{BANNER}.classList.contains('is-visible') && getComputedStyle({BANNER}).display === 'flex'")
        shown_hint = lambda pg: pg.evaluate("[...document.querySelectorAll('[data-install-hint]')].filter(h => !h.hidden).map(h => h.id).join()")

        ctx, pg, errors = phone(IPHONE, "if(!sessionStorage.getItem('seeded')){" + CONSENTED + "sessionStorage.setItem('seeded','1');}")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: no banner on first view", not visible(pg))
        pg.reload(); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: banner on second view (iPhone)", visible(pg))
        check("install: only the designed banner, moved to <body>", pg.evaluate(f"document.querySelectorAll('[data-install-banner]').length === 1 && {BANNER}.parentNode === document.body"))
        check("install: iOS hint only, no Install button", shown_hint(pg) == "hint-ios" and pg.evaluate("document.getElementById('banner-install').hidden"), shown_hint(pg))
        check("install: Button component's wrapper hidden with its link (iOS)", pg.evaluate("document.getElementById('cb-install').hidden && getComputedStyle(document.getElementById('cb-install')).display === 'none'"))
        check("install: business name used", pg.text_content("[data-install-title]") == "Add Test Plumbing Co. to your Home Screen" and pg.text_content("[data-install-name]") == "Test Plumbing Co.")
        check("install: webclip icon set", pg.evaluate("document.querySelector('[data-install-icon]').getAttribute('src').startsWith('data:image/png')"))
        check("install: icon has alt text", pg.get_attribute("[data-install-icon]", "alt") == "Test Plumbing Co. icon", pg.get_attribute("[data-install-icon]", "alt"))
        check("install: sits above bottom nav", pg.evaluate(f"{BANNER}.getBoundingClientRect().bottom <= document.querySelector('.bottom-nav_bar').getBoundingClientRect().top"),
              pg.evaluate(f"[{BANNER}.getBoundingClientRect().bottom, document.querySelector('.bottom-nav_bar').getBoundingClientRect().top]"))
        check("install: does not take focus", pg.evaluate(f"!{BANNER}.contains(document.activeElement)"))
        pg.click("#banner-close"); pg.wait_for_timeout(400)
        check("install: close hides it (stays in the page)", not visible(pg) and pg.evaluate(f"!!{BANNER}"))
        check("install: close remembered", pg.evaluate("CoreInstall.state().snoozed"))
        pg.reload(); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: stays closed after reload", not visible(pg))
        pg.click("#tab-more"); pg.wait_for_timeout(450)
        check("install: trigger is a button", pg.get_attribute("#install-open", "role") == "button" and pg.get_attribute("#install-open", "href") is None)
        pg.click("#install-open"); pg.wait_for_timeout(900)
        check("install: trigger shows banner even when closed", visible(pg) and not pg.evaluate("CoreSheet.current()"))
        check("install: no JS errors (iPhone)", not errors, errors)
        ctx.close()

        ctx, pg, errors = phone(IPHONE, "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: waits while cookie notice is open", not visible(pg) and pg.evaluate("CoreSheet.current() && CoreSheet.current().getAttribute('data-sheet') === 'cookie-notice'"))
        pg.click("#necessary"); pg.wait_for_timeout(2400)
        check("install: shows after consent answered", visible(pg))
        check("install: no JS errors (consent)", not errors, errors)
        ctx.close()

        ctx, pg, errors = phone(IPHONE, "")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(300)
        pg.evaluate("document.getElementById('cb-necessary-link').click()"); pg.wait_for_timeout(300)
        saved = pg.evaluate("JSON.parse(localStorage.getItem('core-consent-v1'))")
        check("consent: Button component overlay link saves its action", bool(saved) and saved.get("analytics") is False and saved.get("marketing") is False, saved)
        check("consent: no JS errors (button component)", not errors, errors)
        ctx.close()

        ctx, pg, errors = phone(ANDROID, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load")
        pg.evaluate("""() => { const e = new Event('beforeinstallprompt', {cancelable: true});
            e.prompt = () => { window.__prompted = true; }; e.userChoice = Promise.resolve({outcome: 'accepted'});
            window.dispatchEvent(e); }""")
        pg.wait_for_timeout(3500)
        check("install: Android prompt shows Install button", visible(pg) and not pg.evaluate("document.getElementById('banner-install').hidden"))
        check("install: Button component's wrapper shown (Android)", not pg.evaluate("document.getElementById('cb-install').hidden"))
        pg.click("#banner-install"); pg.wait_for_timeout(500)
        check("install: Install opens browser prompt", pg.evaluate("window.__prompted === true"))
        check("install: accepted hides banner", not visible(pg))
        check("install: no JS errors (Android)", not errors, errors)
        ctx.close()

        ctx, pg, errors = phone(INSTA, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:1}));")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: in-app browser hint", pg.get_attribute("#banner", "data-install-platform") == "in-app" and shown_hint(pg) == "hint-in-app")
        ctx.close()

        ctx, pg, errors = phone(IPHONE, CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:5})); Object.defineProperty(navigator, 'standalone', {value: true});")
        pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: never shown when standalone", not visible(pg))
        check("install: trigger hidden when standalone ([hidden] beats its class)", pg.evaluate("document.getElementById('install-open').hidden && getComputedStyle(document.getElementById('install-open')).display === 'none'"))
        ctx.close()

        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        ctx.add_init_script(CONSENTED + "localStorage.setItem('core-install-v1', JSON.stringify({views:5}));")
        pg = ctx.new_page(); pg.goto(base + plain); pg.wait_for_load_state("load"); pg.wait_for_timeout(3500)
        check("install: no banner on desktop", not visible(pg))
        check("install: trigger hidden on desktop", pg.evaluate("document.getElementById('install-open').hidden"))
        ctx.close()

        browser.close()
    httpd.shutdown()
    for name in ("_plain.html",):
        path = os.path.join(ROOT, "test", name)
        if os.path.exists(path): os.remove(path)
    print(f"\n{'All browser tests passed.' if not failures else str(len(failures)) + ' failed: ' + ', '.join(failures)}")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(run())
