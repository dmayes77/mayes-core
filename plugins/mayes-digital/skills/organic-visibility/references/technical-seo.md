# Technical Seo

Read for crawlability, sitemaps, canonicals, redirects, structured data, imagery, mobile behavior, and performance requirements. Webflow Development implements approved changes.

## Technical SEO

Technical SEO ensures that relevant website content can be discovered, accessed, and interpreted appropriately.

### Evaluation areas

- HTTP response behavior.
- HTTPS configuration.
- Indexing directives.
- Robots configuration.
- XML sitemaps.
- Canonical URLs.
- Redirects.
- Internal links.
- Semantic HTML.
- Structured data.
- Mobile usability.
- Website performance.

### Responsibilities

Organic Visibility defines technical discoverability requirements.

Webflow Development implements the requirements.

Quality Assurance verifies actual behavior.

Do not report technical SEO improvements as complete without appropriate verification.

---

---

## Indexing and Crawlability

Evaluate whether intended public pages can be discovered and indexed.

### Requirements

- Important public pages are accessible.
- Indexing directives reflect business intent.
- Production pages are not accidentally blocked.
- Staging pages are appropriately controlled.
- Important pages are linked internally.
- Sitemap entries reflect intended canonical pages.
- Redirects behave appropriately.

### Important distinctions

- Crawling does not guarantee indexing.
- Indexing does not guarantee ranking.
- Sitemap submission does not guarantee indexing.
- Robots directives and indexing directives serve different purposes.

Use appropriate authentication or access controls when content must remain private.

Robots directives are not a security mechanism.

---

---

## XML Sitemaps

Use appropriate XML sitemap functionality.

### Requirements

- Include intended canonical public pages.
- Avoid unnecessary staging URLs.
- Avoid broken destinations.
- Maintain correct domain references.
- Evaluate dynamic CMS pages.
- Verify sitemap accessibility.
- Submit through appropriate webmaster platforms when authorized.

### Webflow implementation

Evaluate native Webflow sitemap functionality before introducing custom sitemap generation.

Do not create a competing sitemap system without a demonstrated requirement.

---

---

## Canonical URLs

Canonical URLs help communicate preferred versions of substantially equivalent content.

### Requirements

- Use appropriate canonical destinations.
- Maintain consistent domain configuration.
- Avoid contradictory canonical signals.
- Evaluate duplicate URL variations.
- Preserve correct CMS canonical behavior.

### Important distinction

Canonical declarations are signals, not absolute commands.

Do not use canonical tags as a substitute for correcting unnecessary duplicate content or inappropriate URL architecture.

---

---

## Redirect Management

Use redirects when existing URLs are moved or replaced.

### Requirements

- Identify affected URLs.
- Select relevant replacement destinations.
- Use appropriate redirect behavior.
- Avoid unnecessary redirect chains.
- Avoid redirect loops.
- Update internal links.
- Verify the final destination.

### Avoid

- Redirecting unrelated pages to the homepage.
- Removing valuable pages without evaluation.
- Creating redirects without understanding their purpose.

Maintain appropriate redirect documentation during website migrations.

---

---

## Structured Data

Structured data helps communicate machine-readable information about website content and business entities.

### Applicable schema candidates

Depending on the business:

- Organization.
- LocalBusiness.
- Appropriate LocalBusiness subtypes.
- WebSite.
- WebPage.
- BreadcrumbList.
- Service.
- Product.
- Offer.
- Article.

Use only applicable schema types.

### Requirements

- Use accurate business information.
- Match visible website content.
- Preserve consistent entity relationships.
- Avoid duplicate or contradictory markup.
- Follow current search platform eligibility requirements.
- Validate implementation.

### Core implementation

Inspect the existing Core business structured-data architecture before adding new JSON-LD.

Use Business Settings as the authoritative source where applicable.

Do not create independent page-level business markup that conflicts with existing shared structured data.

### Important distinction

Valid structured data does not guarantee rich results or higher rankings.

Schema.org vocabulary availability does not establish Google rich-result eligibility.

---

---

## Review and FAQ Structured Data

Evaluate review and FAQ markup against current official eligibility requirements.

### Review markup

- Use authentic review information.
- Do not invent aggregate ratings.
- Do not mark up reviews that are not appropriately represented.
- Evaluate restrictions involving self-serving reviews.

### FAQ markup

- Use actual visible questions and answers.
- Evaluate current rich-result eligibility.
- Do not assume every local-business FAQ qualifies for enhanced search presentation.

### Requirements

Structured data must reflect actual content and applicable platform rules.

Do not promise review stars or FAQ rich results merely because markup is present.

---

---

## Image Visibility

Images support customer understanding, credibility, and discoverability.

### Requirements

- Use relevant images.
- Provide meaningful alternative text when appropriate.
- Use understandable filenames where practical.
- Preserve appropriate image dimensions.
- Avoid unnecessary file sizes.
- Maintain suitable image quality.
- Preserve authentic project evidence.

### Alternative text

Describe meaningful image content according to its context.

Example:

Black SUV after exterior polishing.

Avoid:

Best Chattanooga auto detailing car detailing professional detailing near me.

### Decorative images

Use appropriate empty alternative text when an image is purely decorative and does not convey meaningful information.

Coordinate image implementation with Core Design System and Webflow Development.

---

---

## Mobile Discoverability

Mobile usability is essential to the organic customer experience.

### Requirements

- Important content remains available on mobile.
- Navigation remains usable.
- Primary actions remain accessible.
- Text remains readable.
- Images remain appropriately presented.
- Forms remain usable.
- Important links remain discoverable.
- Fixed interface elements do not obscure content.

### Search considerations

Preserve meaningful content and metadata across responsive presentations.

Do not remove important information from mobile solely to simplify appearance.

Coordinate mobile experience decisions with Experience Design.

---

---

## Website Performance

Website performance supports usability and may contribute to search experience quality.

### Core Web Vitals

Evaluate where applicable:

| Metric | Good threshold |
|---|---|
| Largest Contentful Paint | 2.5 seconds or less |
| Interaction to Next Paint | 200 milliseconds or less |
| Cumulative Layout Shift | 0.1 or less |

Evaluate applicable field data at the 75th percentile.

Verify current official thresholds before formal reporting.

### Development priorities

- Efficient images.
- Appropriate resource loading.
- Minimal unnecessary scripts.
- Stable layouts.
- Responsive interactions.
- Appropriate third-party dependencies.

### Important distinction

Strong performance does not guarantee strong rankings.

Do not pursue a perfect synthetic performance score at the expense of meaningful customer functionality.

Coordinate technical measurement with Quality Assurance.

---
