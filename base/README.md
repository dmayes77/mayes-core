# $500 Base site

The Launch & Own offer: a professional 3-page website, mobile-first, with 30 days of post-launch support. Built by duplicating the Core Design System 2.0 master.

## Pages

Each page is the Page Shell plus section components dragged into its **Main Content** slot, in this order. (Webflow's API can't place anything in a slot, so this step is done in the Designer.)

| Page | Main Content, top to bottom |
|---|---|
| Home `/` | Section / Hero (or Hero / Image, Hero / Video, Hero / Quote Form) · Section / Card Row with Card / Service (or Section / Service List) · Section / Why Us · Section / Process · Section / Reviews (or Section / FAQ until the client has real reviews) · Section / Final CTA |
| Services `/services` | Section / Page Header · Section / Card Row or Section / Service List · Section / Process · Section / Final CTA |
| Contact `/contact` | Section / Page Header · Section / Contact |
| Privacy `/privacy` | Section / Page Header · Section / Legal Text |
| 404 (Utility page) | Section / Not Found |

New pages start from the draft **Page Template** page: duplicate it to get the Page Shell (announcement bar, nav, footer, bottom nav, sheets) and the hidden business data layer (`shell-data`). Core Business logs a console warning on any page that has no data layer.

## Section components

Most are in the **Sections** group (heroes are in **Hero**), built from Core classes and tokens (`section-medium`, `padding-global`, `container-large`, `section-header`, `section-grid`, `feature-card`, …). Every heading, paragraph, button label and link is a component prop, so copy is edited per page in the right panel without opening the component. Motion comes from the `data-motion` attributes already on them (Webflow Interactions).

| Component | What it holds | Wired to Core |
|---|---|---|
| Section / Hero | eyebrow, H1, intro, two buttons, image + alt | Get a free quote opens the Quote sheet (`data-sheet-open="quote"`); Call now dials the Business Settings phone (`data-business-href="phone-href"`) |
| Hero / Image, Hero / Video | full-screen photo or video hero with a scrim; same copy and buttons as Section / Hero | Same buttons as Section / Hero |
| Hero / Quote Form | hero copy and Call now on the left, a native quote form (Name, Phone, What do you need?) on the right | Submissions arrive as **Hero Quote** |
| Section / Trust Strip | 4 short promises (Card / Trust Item: icon, title, one line) | Goes right under the hero |
| Section / Chip Row | Chip links (label, link) | Wraps on desktop, one swipeable row on phones |
| Section / Card Row | eyebrow, heading, intro over a Peek-a-boo slider of cards in a **Cards** slot: Card / Service, Card / Standard, Card / Background, or Card / Pricing (variant **Pricing**) | Swipe and snap, no JS (`card-row`) |
| Section / Card Grid | header over a wrapping grid of any cards | Use it when cards should wrap, not swipe |
| Section / Service List | up to 8 services (Card / Service Item: name + one sentence) in two columns | For businesses with many services |
| Section / Split | text beside a photo, optional button; variant Image Left | — |
| Section / About | owner or founder story with a square photo | — |
| Section / Before After | one project from the **Projects** collection (Show on Home on, newest Completed) in Media / Before After | Needs Core's optional `dist/core-before-after.js` |
| Section / Why Us | eyebrow, heading, Card / Feature items in an **Items** slot | — |
| Section / Process | eyebrow, heading, Card / Step items in a **Steps** slot | — |
| Section / Reviews | eyebrow, heading, rating summary, and Card / Review items from the **Reviews** collection (first 6) | Real 5-star Google reviews only, word for word, with the reviewer's consent |
| Section / FAQ | eyebrow, heading, FAQ / Item questions in a **Questions** slot | Native `details`/`summary`: opens with no JS |
| Section / Final CTA, Section / Final CTA Image | heading, text, two buttons (Image: on a background photo with a scrim) | Same buttons as the Hero |
| Section / Page Header | eyebrow, H1, intro | — |
| Section / Contact | phone, email, address + directions, today's status, weekly hours; native form **Contact** (Name, Phone, Email, Message) | All details fill from Business Settings and Business Hours; hours use the designed `contact-hours_row` |
| Section / Legal Text | rich-text policy | Template only: replace with the client's reviewed policy |
| Section / Not Found | eyebrow, H1, text, Back to home, Get a free quote | — |

Other building blocks: **Section** (universal, with Surface and Content slots), **Slider / Peek-a-boo** (the Card Row slider on its own), **Media / Before After**, **Button / Standard Flat** (every button except form submits: Text, Link, Variant, icon, and the behavior props Opens Sheet, Fills From Business, Business Field, Consent Action, Install Action), **Chip**, the **Icon** and **Social Icons** sets, and the alternative top navs **Navigation / Compact** and **Navigation / Service**.

**Service prices (built 2026-11-19):** Card / Service and Card / Service Item have a **Price** prop (default "From $99") and a **Show Price** switch (off by default), shown in a `service-price` line under the title. Section / Service List has a **Show Prices** switch and **Item 1–8 Price** props that feed its eight items.

The top nav defaults to Home, Services and Contact (turn on **Show Link 4** for a fourth); its CTA opens the Quote sheet. The footer defaults to Pages (Home, Services, Contact) and Info (Privacy policy, Request a quote); the newsletter form is off (**Show Subscribe**).

## Mobile app layer

Screens 767px and narrower get a flush top bar and a flush bottom nav, like an app. Neither floats, and the page doesn't bounce under them. Wider screens, including tablets, keep a normal header and footer.

- **Top bar:** logo and a ⋯ button that opens one sheet of general business info and settings. In the master today that is the Settings sheet (Privacy & cookies, Add to Home Screen). Decided 2026-11-19: it also takes the hours and location (address, directions), so a site needs no Location tab. No dropdown on phones.
- **Bottom nav (standard, decided 2026-11-19):** Home · Services (with prices) · **Call** (middle) · Our Work · Quote. Home, Services and Call are fixed in that order. Tabs 4 and 5 can be swapped per trade or per client (for example Book, Menu, Shop, or Collab on a creator site). Quote is quiz-style: a few tap questions, then name and phone, sent as one native form.
- **Bottom nav in the master (built 2026-11-19):** Home (`/`) · Services (the Services page) · Call (`data-business-href="phone-href"`, falls back to `/contact`) · Our Work (`/our-work`) · Quote (`data-sheet-open="quote"`).
- **Desktop:** the ⋯ button is hidden; the footer's "Cookie settings" link opens the same Settings sheet.
- **Top nav only (option):** the bottom nav is the default. A site may instead run only the top bar on phones. Change it once, inside the Page Shell: set Navigation / Glass to the **App Menu** variant (logo, Call, and Menu, which opens Sheet / Menu), turn off visibility on `shell-mobile-nav`, and set the `page-shell` bottom padding at the small breakpoint to `env(safe-area-inset-bottom, 0px)`. Keep 44px tap targets. A site uses one phone navigation setup, never both, and Call appears exactly once on phones.

In the Webflow master:

| Component | Goes in | Notes |
|---|---|---|
| Page Shell | page body | One slot: **Main Content**. Everything else is built in and identical on every page: the announcement bar (`announcement-bar`, filled from Business Settings, hidden when empty), the top nav (`shell-header`), footer (`shell-footer`), bottom nav (`shell-mobile-nav`, 767px and below), the sheets (`shell-sheets`, native Modals) and Core / Install Banner. Change any of them once in its component |
| Navigation / Glass | inside the Page Shell (`shell-header`) | Flush top bar: logo, links, and a Get a quote button (`data-sheet-open="quote"`, text from the CTA Text prop, hidden with Show CTA); ⋯ button (`data-sheet-open="site-settings"`) on phones |
| Navigation / Site Bottom Nav | inside the Page Shell (`shell-mobile-nav`) | Variants **Base** (flush bar, the default), **Float** (inset, rounded, floating) and **Float Raised Call** (a slim floating bar with Call as a raised, icon-only circle). Tabs: Home, Services, Call, Our Work (links) and Quote (sheet), the standard above. Each tab is a link (`bottom-nav_hit`) with its icon and label inside; a sheet tab carries `data-sheet-open="NAME"`. The active tab is the link's **Current** state in Webflow |
| Core / Install Banner | Page Shell root, once | Add to Home Screen banner; its look is the `install-banner_*` classes. Preview it by adding the `is-visible` combo |
| Sheet / Site Settings | inside the Page Shell (`shell-sheets` div), once | `site-settings` sheet (opened by ⋯): Hours & location (today's hours, a Directions row filled from `directions-url`, the week's hours), Add to Home Screen, Privacy & cookies + `cookie-notice` sheet (a full-width bar on desktop with the `is-banner` combo). Switches use `settings_switch` with the `is-on` and `is-disabled` combos; buttons use `button` and `button is-secondary` |
| Sheet / Menu | inside the Page Shell (`shell-sheets` div) | Menu sheet for the top-nav-only option, opened by the Menu button in Navigation / Glass App Menu. Its links are typed into the component, not props |
| Sheet / Services | inside the Page Shell (`shell-sheets` div) | `services` sheet: quick list with an icon tile per row (`sheet-row_icon`) and an All services link |
| Sheet / Location | not in the Page Shell | Retired: no tab has opened it since 2026-11-19, when its content moved into the ⋯ sheet, and it was removed from the Page Shell on 2026-11-28. The component definition is still in the library |
| Sheet / Quote | inside the Page Shell (`shell-sheets` div) | `quote` sheet with a native Webflow form (Name, Phone, What do you need?); rename to Collab on creator sites. Becomes the quiz-style quote (2026-11-19) |
| Footer / Standard | inside the Page Shell (`shell-footer`) | Logo, copyright and social icons fill from Business Settings; empty social links hide; "Cookie settings" link |
| Business data layer | every page, next to the Page Shell (comes with the Page Template) | Hidden. Renders the Business Settings item and the 7 Business Hours items for `core-business.js` |

**Sheet naming:** the component is `Sheet / Name`; the sheet's root class is the sheet's own name with the `is-hidden` combo (`settings is-hidden`, `location is-hidden`), and its inner parts use that name as a prefix (`location_hours`, `location_actions`). `data-sheet` is the lowercase name that openers use (`data-sheet-open="location"`).

**Business data layer:** a hidden `shell-data` div with two Collection Lists (Business Settings, limit 1; Business Hours, limit 7). Each field is a native element bound to the CMS with `data-business-field="slug"`; each hours item is `[data-business-hours-entry]` with `data-business-hours-day / -order / -open / -close`, plus a "true" text whose visibility is bound to Closed. Webflow refuses any component that holds a CMS-bound Collection List, even in the Designer, so the layer sits on each page. Start every new page from the Page Template page so it comes along.

**Motion:** the site-wide Webflow Interactions Core / Fade, Rise, Scale, Stagger (each direct child in turn) and Hero (on load) animate any element with `data-motion="fade|rise|scale|stagger|hero"`. Edit the motion in the Interactions panel. (Core v2 has no motion script; the `core-motion` meta in the head is harmless and can go.)

Site custom code loads the consent snippet, the app head snippet and `core.css` in the head, and `core.js` before `</body>` (no GSAP: Core v2 doesn't use it), all pinned to the same release tag.

**Styling is native (Core v2):** every look and layout is a Webflow class. Each sheet is a native Modal styled by the `sheet` class (fixed to the bottom, full width up to 36rem, top radius); `core.css` adds only the slide, the `::backdrop` and the scroll lock, which the style panel can't express. Core toggles `is-*` combos that the master styles: the switches' `is-on` / `is-disabled`, the banner's `is-visible`, the icon links' `is-business-filled`. Safe areas (`env(safe-area-inset-*)`) sit on Body, `shell-header`, `bottom-nav_bar`, `sheet_panel` and `install-banner`. To restyle any of it, edit those classes and combos.

**Sheet padding is global:** `sheet_panel` carries the side padding for every sheet, from the same Global padding token as `padding-global`, and the bottom padding never sits under the home bar (`max(1.25rem, env(safe-area-inset-bottom))`). Sheet contents add no side padding of their own.

**Sheet parts:** `sheet` (the Modal) › `sheet_panel` › `sheet_grabber` (`data-sheet-grabber`) › `sheet_head` (`data-sheet-head`: `sheet_title`, `sheet_close`) › `sheet_body` › footer (`button-group is-sheet-footer`). `sheet_body` carries the scroll recipe: flex 1 1 auto, min-height 0, overflow-y auto, overscroll-behavior contain, scrollbar-width none.

**Utility classes stay pure:** `layout-column` (and `layout-row`) only lay things out: flex direction, wrap, gap. Padding, color and size go on the element's own class, never in a combo on a layout utility.

**Buttons always sit in a `button-group`**, even a single button. The group owns spacing, wrapping and stacking, so a second button never means restructuring, and every CTA row lines up the same way. Use the `is-split` combo when the buttons should share the row equally. Don't leave an empty group on the page: hide it, or the gap stays.

**Every button's link is a prop** (Webflow link prop: a URL, a page, a section, phone or email). Buttons that also do something carry a second prop bound to the attribute: "Opens Sheet" → `data-sheet-open` (default `quote`; clear it and the button follows its Link) and "Fills From Business" → `data-business-href` (default `phone-href`; clear it to use the Link).

**Every image has alt text and every link has a name.** Images: set the alt in the image settings or the component's Image Alt prop (Core gives `[data-business]` images the business name). Links: visible text that says where it goes; a link with only an icon gets an `aria-label`. "Learn more" links carry a hidden `sr-only` span with the subject ("Learn more about Service 1").

Add to Home Screen: the app head snippet makes the saved site open full screen, and Core shows phone visitors a banner on their second page view. The Settings sheet carries an "Add to Home Screen" row (`data-install-open`). Opened from the home screen there is no browser back button, so every page keeps the bottom nav.

## CMS

Four collections, all in the master with placeholder content:

- **Business Settings** (1 item) and **Business Hours** (7 items): the business record.
- **Reviews:** Name, Initial, Review Text, Date, Review Link, Featured. Feeds Section / Reviews. Real 5-star Google reviews only, word for word, with consent.
- **Projects:** Name, Before Photo / Alt, After Photo / Alt, Service, Area, Completed, Show on Home. Feeds Section / Before After (the newest Completed job with Show on Home on).

Business Settings field slugs match `data-business` names in `core-business.js` (business-name, phone, email, booking-url, street-address, city, state, zip-code, directions-url, google-business-url, announcement, footer-copyright, and the social links facebook, instagram, tiktok, youtube, linkedin, nextdoor, x-url). Business Hours: Name (the day), Day Order, Open, Close, Closed, Note. Services and FAQs are component props at this tier; a Services collection is added only on plans with per-service pages. GoHighLevel embeds stay dormant until the client moves to a managed plan.

## Per-client checklist

- [ ] Duplicate the Base site in Webflow; name it `<client>-mayesdigital`.
- [ ] Primitives: brand colors and fonts.
- [ ] Business Settings and Business Hours items.
- [ ] Logos, favicon, share image, webclip (180×180 PNG, no transparency).
- [ ] App head snippet: short name (max ~12 characters) and theme color.
- [ ] Choose Home sections; write copy; add imagery with alt text.
- [ ] Services page content; Reviews (real ones) or FAQ on Home.
- [ ] Privacy policy text from the client.
- [ ] Contact and Quote form recipients (Site settings › Forms) and thank-you messages.
- [ ] Bottom nav: Home · Services · Call are fixed; set tabs 4 and 5 for the trade or client (default Our Work · Quote); check every sheet.
- [ ] Service prices on the Services cards (Show Price), or off if the client won't publish them.
- [ ] Projects (Our Work) and Reviews items: real jobs and real reviews only.
- [ ] Quote form: notification email and thank-you message.
- [ ] Footer copyright and social links in Business Settings.
- [ ] SEO title and description on each page. Leave Page settings › Schema markup empty: Core writes the JSON-LD from Business Settings.
- [ ] Site head: `<meta name="core-schema-type" content="…">` with the schema.org type for the trade (Plumber, HVACBusiness, HairSalon, AutoRepair…). Check it with Google's Rich Results Test.
- [ ] QA at Desktop, Tablet, Mobile Landscape, Mobile Portrait, on a real phone.
- [ ] Custom code pins `mayes-core` to a release tag.
- [ ] Business Settings and Business Hours template pages: keep their head code (noindex + redirect home) and turn off Sitemap indexing in their Page settings. They only feed data; their item pages aren't for visitors.
- [ ] Delete the internal Components and Style Guide draft pages, or keep them as drafts (never publish them).
- [ ] Connect domain, publish, start the 30-day support window.
