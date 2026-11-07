# $500 Base site

The Launch & Own offer: a professional 3-page website, mobile-first, with 30 days of post-launch support. Built by duplicating the Core Design System 2.0 master.

## Pages

| Page | Sections (Core components) |
|---|---|
| Home | Hero · Service Choice · Why · Process · Reviews (or FAQ when the client has no reviews yet) · Final CTA |
| Services | Service Hero · Service Category card grid · Process |
| Contact | Contact section · native Webflow form · directions · hours |
| Privacy, 404 | Core templates (not counted in the 3 pages) |

## Mobile app layer

Brand bar (logo, Call) · bottom nav: Home · Services (sheet) · Call or Book · Location (sheet) · More (sheet). Desktop keeps a normal header, dropdown and footer.

In the Webflow master (built 2026-11-03):

| Component | Goes in | Notes |
|---|---|---|
| Page Shell | page body | Slots: Nav / Header, Main Content, Footer, Overlay, Mobile Nav |
| Navigation / Bottom Nav | Page Shell › Mobile Nav | Tabs slot takes 3–5 tabs; columns size themselves; hidden above 991px |
| Navigation / Bottom Nav Tab | Bottom Nav › Tabs | Props: Label, Link, Action (`sheet:NAME`, `click:SELECTOR`), Sheet Mode. Slots: Icon, Badge |
| Sheet / Content | Page Shell › Overlay | Props: Name, Title, Height, Mode. Content slot for links, text, a form |
| Core / Site Settings | Page Shell › Overlay, once | Settings sheet (`site-settings`) + cookie notice; More tab opens it with Sheet Mode `bottom` |

Site custom code loads the consent snippet, `core.css`, GSAP, and `core.js`, all pinned to `@v1.3.0`. To turn on Add to Home Screen, move them to `@v1.4.3` and add the app head snippet.

Add to Home Screen: the app head snippet makes the saved site open full screen, and Core shows phone visitors a banner on their second page view. The More sheet carries an "Add to Home Screen" row (`data-install-open`). Opened from the home screen there is no browser back button, so every page keeps the bottom nav.

## CMS

Business Settings (1 item) and Business Hours (7 items) only. Both exist in the master with placeholder content. Business Settings field slugs match `data-business` names in `core-business.js` (business-name, phone, email, booking-url, street-address, city, state, zip-code, directions-url, google-business-url, announcement, social URLs, and more). Business Hours: Day Order, Open, Close, Closed, Note. Services, reviews and FAQs are component props at this tier; a Services collection is added only on plans with per-service pages. GoHighLevel embeds stay dormant until the client moves to a managed plan.

## Per-client checklist

- [ ] Duplicate the Base site in Webflow; name it `<client>-mayesdigital`.
- [ ] Primitives: brand colors and fonts.
- [ ] Business Settings and Business Hours items.
- [ ] Logos, favicon, share image, webclip (180×180 PNG, no transparency).
- [ ] App head snippet: short name (max ~12 characters) and theme color.
- [ ] Choose Home sections; write copy; add imagery with alt text.
- [ ] Services page content.
- [ ] Contact form recipient and thank-you message.
- [ ] Bottom nav: Call or Book; check every sheet.
- [ ] SEO title and description on each page.
- [ ] QA at Desktop, Tablet, Mobile Landscape, Mobile Portrait, on a real phone.
- [ ] Custom code pins `mayes-core` to a release tag.
- [ ] Connect domain, publish, start the 30-day support window.
