# Native-first audit (2026-11-07)

**Rule:** if Webflow can do it natively, Core doesn't do it in JS.

Webflow owns markup, styles, content, links, the current-page state and animation. Core JS keeps only what Webflow can't do:
- remembering things between visits (consent choices, install snooze)
- detecting the device or browser
- date and time logic (today's hours)
- data Webflow can't bind where it's shown (the business record outside a CMS context)
- focus and scroll handling that Webflow doesn't provide

When JS has to change how something looks, it toggles an `is-*` combo class and the look of that class is designed in Webflow. Core CSS keeps only what the Webflow style panel can't express.

## What was checked

Checked on the master (Core Design System 2.0) on 2026-11-07:

| Native feature | Result |
|---|---|
| Current page link | **Works.** Webflow renders `w--current` and `aria-current="page"` in the published HTML (seen on the Home bottom-nav tab and the footer logo). |
| Modal and Popover elements | **Not enabled on this site.** Creating one returns "Modals are not enabled" / "Popovers are not enabled". They can't replace sheets yet. |
| Interactions (IX3) | **Available**: click, hover, load, scroll, custom and mouse-move triggers. Interactions can target a class or an attribute (`[data-motion="rise"]`). They support stagger, split text, add/remove/toggle class, and "prefers reduced motion: don't animate". |
| Cookie consent | **No native banner** for custom code. Webflow's consent API only covers its own Analyze and Optimize tools (allow/deny). It doesn't block third-party scripts and doesn't send Google Consent Mode. |
| Usage on the master | No `data-motion`, `data-animate`, `data-scroll-state`, announcement bar, badges or before/after sliders are in use yet. The sheet host is built by JS; its look is hard-coded in `core-sheet.css`. Consent controls are Webflow links, which JS turns into buttons. |

## Module by module

| Module | Verdict | What changes |
|---|---|---|
| **Bottom nav** (`core-bottom-nav.js`, 79 lines) | **Mostly redundant** | Active tab: Webflow already gives the current tab's link `w--current` and `aria-current`, so style the active tab on that current state in Webflow and drop `markActive`. Sheet tabs: put `data-sheet-open="NAME"` on the tab link; the sheet engine already handles it, so `data-tab-action` isn't needed. Remove `click:SELECTOR`, badges (unused on $500 sites) and the GSAP tap pulse (CSS `:active` already does it). `html.has-bottom-nav` becomes CSS `html:has([data-bottom-nav])`. **Result: the file goes away.** Trade-off: Webflow only marks exact page matches, so `/services/x` won't light up the Services tab. That's fine at 3 pages, and CMS templates can set their own current state. |
| **Motion** (`core-motion.js`, 100 lines) | **Redundant** | Replace with site-wide IX3 interactions that target the same attributes: Core / Fade `[data-motion="fade"]`, Core / Rise, Core / Scale, Core / Stagger, Core / Hero (load), plus parallax. The `data-motion` vocabulary stays, but the animation is visible and editable in Webflow's Interactions panel and uses Webflow's own GSAP. `data-scroll-state` becomes an IX3 scroll trigger that adds and removes `is-scrolled`. **Result: the file goes away.** Trade-off: IX3 keeps content hidden until it animates, where Core Motion never hid content. That's acceptable because Webflow's runtime always loads. Reduced motion is set per interaction. |
| **Announcement** (`core-announcement.js`, 40 lines) | **Probably redundant** | The header following the bar is what `position: sticky` does natively: the bar in normal flow, the header sticky at top 0 under it. This needs the header to be sticky rather than fixed, so **test it in the Page Shell** (sticky only works if the header's parent runs the full page height). If it works, the file goes away. |
| **Sheet** (`core-sheet.js` 360, `core-sheet.css` 62) | **Keep the engine; move the look to Webflow** | Native Modals aren't enabled, and even when they are, Core needs a bottom sheet on phones and a dialog on desktop, swipe to close, a scroll lock that holds on iPhone, and focus return. Core already adopts a host designed in Webflow, so build **Sheet / Host** as a Webflow component: overlay, panel, grabber, head, title, close and body, all with Webflow classes. Then cut `core-sheet.css` down to behavior only (display, position and slide per `data-sheet-as`, heights, transitions) and drop the colors, radius, shadow, padding and type. Look at native Modals again when Webflow turns them on. |
| **Consent** (`core-consent.js` 99, `core-consent.css` 23) | **Keep the logic; move the look to Webflow** | Webflow has nothing that gates custom-code scripts or sends Google Consent Mode, so the logic stays. The switches and buttons get their look from Webflow classes. JS adds an `is-on` combo next to `aria-checked`, and Webflow styles `is-on`, because the style panel can't target attribute states. Most of `core-consent.css` goes. The `[data-settings-open]` cog rule is obsolete now that the ⋯ button is in Glass. |
| **Business** (`core-business.js` 163, `core-business.css` 4) | **Keep** | Components in the Page Shell have no CMS context, and Webflow can't bind there. It also can't build the full address or tel: links, group days into "Monday – Friday", or know what today is. One change: hours rows get cloned from a row designed in Webflow (`[data-business-hours-template]`) instead of generated spans, so the row look is Webflow's and `core-business.css` goes. Wherever an element *is* inside a CMS context (the data layer, CMS pages), bind natively instead of using `data-business`. |
| **Install** (`core-install.js` 213, `core-install.css` 17) | **Keep the logic; move the markup to Webflow** | Webflow can't detect iPhone vs Android vs in-app browsers, home-screen mode, or remember a 30-day snooze. The banner itself becomes a Webflow component, **Core / Install Banner**, with one text block per message (iPhone, Android, Install button, in-app browser). JS shows the right one and toggles `is-visible`. It keeps building the banner itself when the component isn't on the page. |
| **Before and After** (`core-before-after.js` 56) | **Keep** | Webflow can't turn a range input's value into the split position. It's already a Webflow component with an optional script. |
| **Safe areas, page stability** (CSS only) | **Keep for now; test moving them** | These hold `env(safe-area-inset-*)`, `overscroll-behavior` and `scrollbar-gutter`. Webflow's style panel accepts custom CSS properties, so test whether it takes `env()` values on the header, bottom nav and sheet classes. If it does, those rules move into the classes and the file shrinks to global `html`/`body` rules. |
| **App head, consent head** (snippets) | **Keep** | Head tags and the Consent Mode default must be custom code. |

About 220 of Core's ~1,100 JS lines (bottom nav, motion, announcement) could go entirely. Most of the remaining CSS that sets a look (sheet, consent, install, hours) moves into Webflow classes.

## Release plan

Removing `data-tab-action`, badges, `data-animate` and the bottom-nav and motion scripts can break older sites that still load Core (DetailFlow, ShopFlow), so the removals ship as **Core v2.0.0**. Those sites stay pinned to their v1 tags until they're rebuilt.

1. **v1.5 (adds things, breaks nothing):**
   - The `is-on` and `is-visible` combo hooks.
   - Hours row template support.
   - Install banner component support.
   - A trimmed `core-sheet.css`, behind `data-sheet-host` designed in Webflow.
   - The master gets the matching components (Sheet / Host, Core / Install Banner) and the IX3 motion interactions.
2. **Master rebuild:**
   - Style the bottom-nav current state in Webflow.
   - Move the tab sheet openers to `data-sheet-open`.
   - Test sticky header vs announcement and `env()` in the style panel.
3. **v2.0.0 (removals):**
   - Delete `core-bottom-nav.*`, `core-motion.js` and, if sticky works, `core-announcement.*`.
   - Delete the look rules from the sheet, consent, install and business CSS.
   - Delete the obsolete cog rule.
   - Update docs and tests.

## Other gaps found during the audit

- The Glass top-bar links and the mobile dropdown links on the master still point to `#`.
