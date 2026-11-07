# $500 Base site

The Launch & Own offer: a professional 3-page website, mobile-first, with 30 days of post-launch support. Built by duplicating the Core Design System 2.0 master.

## Pages

Each page is the Page Shell plus section components dragged into its **Main Content** slot, in this order. (Webflow's API can't place anything in a slot, so this step is done in the Designer.)

| Page | Main Content, top to bottom |
|---|---|
| Home `/` | Section / Hero · Section / Services · Section / Why Us · Section / Process · Section / Reviews (or Section / FAQ until the client has real reviews) · Section / Final CTA |
| Services `/services` | Section / Page Header · Section / Services · Section / Process · Section / Final CTA |
| Contact `/contact` | Section / Page Header · Section / Contact |
| Privacy `/privacy` | Section / Page Header · Section / Legal Text |
| 404 (Utility page) | Section / Not Found |

New pages are made by duplicating Home: that brings the Page Shell (nav, footer, bottom nav, sheets) and the hidden business data layer. Delete the two empty Sections that come with it.

## Section components

All in the **Sections** group, built from Core classes and tokens (`section-medium`, `padding-global`, `container-large`, `section-header`, `section-grid`, `feature-card`, …). Every heading, paragraph, button label and link is a component prop, so copy is edited per page in the right panel without opening the component. Motion comes from the `data-motion` attributes already on them (Webflow Interactions).

| Component | What it holds | Wired to Core |
|---|---|---|
| Section / Hero | eyebrow, H1, intro, two buttons, image + alt | Get a free quote opens the Quote sheet (`data-sheet-open="quote"`); Call now dials the Business Settings phone (`data-business-href="phone-href"`) |
| Section / Services | eyebrow, heading, intro, 3 cards (title, text, link) | — |
| Section / Why Us | eyebrow, heading, 3 reasons | — |
| Section / Process | eyebrow, heading, 3 numbered steps | — |
| Section / Reviews | eyebrow, heading, 3 reviews (text, name) | Use real client reviews only |
| Section / FAQ | eyebrow, heading, 4 questions and answers | Native `details`/`summary`: opens with no JS |
| Section / Final CTA | heading, text, two buttons | Same buttons as the Hero |
| Section / Page Header | eyebrow, H1, intro | — |
| Section / Contact | phone, email, address + directions, today's status, weekly hours; native form **Contact** (Name, Phone, Email, Message) | All details fill from Business Settings and Business Hours; hours use the designed `contact-hours_row` |
| Section / Legal Text | rich-text policy | Template only: replace with the client's reviewed policy |
| Section / Not Found | eyebrow, H1, text, Back to home, Get a free quote | — |

The top nav defaults to Home, Services and Contact (turn on **Show Link 4** for a fourth); its CTA opens the Quote sheet. The footer defaults to Pages (Home, Services, Contact) and Info (Privacy policy, Request a quote); the newsletter form is off (**Show Subscribe**).

## Mobile app layer

Phones and tablets (991px and below) get a flush top bar and a flush bottom nav, like an app. Neither floats, and the page doesn't bounce under them. Desktop keeps a normal header and footer.

- **Top bar:** logo and a ⋯ button that opens the Settings sheet (cookie and privacy choices, Add to Home Screen, legal links). No dropdown on phones.
- **Bottom nav, quick actions only:** Home · Services (sheet) · Call · Location (sheet) · Quote (sheet). On a creator or influencer site the Quote tab becomes **Collab**, which opens the same kind of sheet with a collaboration form.
- **Desktop:** the ⋯ button is hidden; the footer's "Cookie settings" link opens the same Settings sheet.

In the Webflow master:

| Component | Goes in | Notes |
|---|---|---|
| Page Shell | page body | Slots: Nav / Header, Main Content, Footer, Mobile Nav (fixed, 991px and below), Sheets. (The old Overlay slot is no longer used.) |
| Navigation / Glass | Page Shell › Nav / Header | Flush top bar; ⋯ button (`data-sheet-open="site-settings"`) on phones |
| Navigation / Site Bottom Nav | Page Shell › Mobile Nav | Home, Services, Call, Location, Quote. A tab opens a sheet with `data-tab-action="sheet:NAME"` |
| Sheet / Host | Page Shell root (not a slot), once | The frame every sheet opens in; its look is the `sheet-host_*` classes. Preview it by adding the `is-open` combo to `sheet-host` |
| Core / Install Banner | Page Shell root, once | Add to Home Screen banner; its look is the `install-banner_*` classes. Preview it by adding the `is-visible` combo |
| Sheet / Site Settings | Page Shell › Sheets, once | `site-settings` sheet + `cookie-notice` sheet. Switches use `settings_switch` with the `is-on` and `is-disabled` combos; buttons use `button` and `button is-secondary` |
| Sheet / Services | Page Shell › Sheets | `services` sheet |
| Sheet / Location | Page Shell › Sheets | `location` sheet: today's hours, address, Directions, Call, the week's hours |
| Sheet / Quote | Page Shell › Sheets | `quote` sheet with a native Webflow form; rename to Collab on creator sites |
| Footer / Standard | Page Shell › Footer | Logo, copyright and social icons fill from Business Settings; empty social links hide; "Cookie settings" link |
| Business data layer | Home page, inside the Page Shell (see below) | Hidden. Renders the Business Settings item and the 7 Business Hours items for `core-business.js` |

**Sheet naming:** the component is `Sheet / Name`; the sheet's root class is the sheet's own name with the `is-hidden` combo (`settings is-hidden`, `location is-hidden`), and its inner parts use that name as a prefix (`location_hours`, `location_actions`). `data-sheet` is the lowercase name that openers use (`data-sheet-open="location"`).

**Business data layer:** a hidden `shell-data` div with two Collection Lists (Business Settings, limit 1; Business Hours, limit 7). Each field is a native element bound to the CMS with `data-business-field="slug"`; each hours item is `[data-business-hours-entry]` with `data-business-hours-day / -order / -open / -close`, plus a "true" text whose visibility is bound to Closed. Webflow can't put a live Collection List inside a component created through the API, so the layer sits on the page. Copy it onto every new static page (or duplicate pages from Home) until it is moved into the Page Shell in the Designer.

**Motion:** the site-wide Webflow Interactions Core / Fade, Rise, Scale, Stagger (each direct child in turn) and Hero (on load) animate any element with `data-motion="fade|rise|scale|stagger|hero"`. The head carries `<meta name="core-motion" content="webflow">` so Core Motion stays out of the way. Edit the motion in the Interactions panel.

Site custom code loads the consent snippet, the app head snippet, `core.css` and GSAP in the head, and `core.js` before `</body>`, all pinned to the same release tag.

Add to Home Screen: the app head snippet makes the saved site open full screen, and Core shows phone visitors a banner on their second page view. The Settings sheet carries an "Add to Home Screen" row (`data-install-open`). Opened from the home screen there is no browser back button, so every page keeps the bottom nav.

## CMS

Business Settings (1 item) and Business Hours (7 items) only. Both exist in the master with placeholder content. Business Settings field slugs match `data-business` names in `core-business.js` (business-name, phone, email, booking-url, street-address, city, state, zip-code, directions-url, google-business-url, announcement, footer-copyright, and the social links facebook, instagram, tiktok, youtube, linkedin, nextdoor, x-url). Business Hours: Name (the day), Day Order, Open, Close, Closed, Note. Services, reviews and FAQs are component props at this tier; a Services collection is added only on plans with per-service pages. GoHighLevel embeds stay dormant until the client moves to a managed plan.

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
- [ ] Bottom nav: Quote (or Collab on creator sites); check every sheet.
- [ ] Quote form: notification email and thank-you message.
- [ ] Footer copyright and social links in Business Settings.
- [ ] SEO title and description on each page.
- [ ] QA at Desktop, Tablet, Mobile Landscape, Mobile Portrait, on a real phone.
- [ ] Custom code pins `mayes-core` to a release tag.
- [ ] Connect domain, publish, start the 30-day support window.
