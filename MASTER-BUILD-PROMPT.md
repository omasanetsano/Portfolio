# Master Build Prompt — Personal Portfolio Inspired by Noirspace

Build a complete, production-ready personal portfolio website for me, using the following live website as the strict visual and structural reference:

https://noirspace.framer.website/

This must be a close, page-for-page and section-for-section recreation of the reference’s visual experience: composition, proportions, spacing, typography hierarchy, grid lines, dark palette, image treatment, card geometry, navigation behavior, interactions, page transitions, scroll motion, responsive reordering, and overall editorial rhythm.

Do not reinterpret the reference into a different portfolio concept. Preserve its exact information flow: the same ordering of visual beats, the same alternation between dense and open sections, the same direction and timing of entrances, the same hover logic, the same mobile reordering, the same menu behavior, and the same relationship between text, borders, imagery, and whitespace. Improvements should refine execution rather than change the underlying experience.

The finished result should feel at least as polished as the reference and preferably better in accessibility, performance, maintainability, motion smoothness, and mobile usability.

## No CMS or admin system

Do not build a CMS, admin dashboard, database, authentication flow, content API, visual editor, or third-party content platform. This is my personal portfolio, and I will edit its source code directly.

Keep every editable value in clearly organised local files:

- `src/content/profile.ts`
- `src/content/projects.ts`
- `src/content/experience.ts`
- `src/content/services.ts`
- `src/content/testimonials.ts`
- `src/content/faqs.ts`
- `src/content/socials.ts`
- `content/blog/*.mdx`

If the chosen project structure uses the App Router without a `src` directory, place the same modules in a top-level `content/` directory. Images must remain in `public/images/`. I should be able to update names, copy, links, prices, projects, dates, and images by editing these files and rebuilding the site.

## Non-negotiable originality rule

Recreate the design system and interaction quality, but do not copy Noirspace’s name, logo, written content, personal details, portfolio projects, testimonials, photographs, blog posts, pricing claims, links, or proprietary assets. Replace all of those with an original personal identity, original text, original project material, and licensed or newly generated visuals.

Use temporary content only where my real information has not been supplied. Mark unverified facts as placeholders. Never invent clients, employers, awards, project results, testimonials, revenue, success percentages, years of experience, or other credibility claims.

## Working method

Before coding:

1. Inspect every public reference page at desktop, tablet, and mobile sizes:
   - /
   - /works
   - at least two /works/[slug] case studies
   - /blog
   - at least two /blog/[slug] articles
   - /contact
   - /404
2. Record the reference’s actual section order, max-width behavior, responsive breakpoints, gaps, type sizes, borders, image ratios, hover states, sticky elements, mobile menu, transitions, and scroll animations.
3. Create a concise design-token map before implementation.
4. Build reusable components and data models rather than hard-coding every page independently.
5. Compare the implementation against the reference visually at 1440 px, 1280 px, 1024 px, 768 px, 430 px, 390 px, and 360 px.

Do not stop after creating a rough landing page. Implement all pages, interactions, responsive states, error states, metadata, and content models described below.

## Core visual direction

The reference uses a sophisticated dark editorial system with industrial grid detailing.

Use this measured starting palette:

- Canvas black: approximately #0D0D0D
- Elevated black: approximately #121212 to #171717
- Warm sand text: approximately #DBCAAF
- Coral-red accent: approximately #EB5939
- Muted sand/grey: derive accessible variants from the primary sand
- Hairline borders: subtle warm-grey/charcoal with low contrast
- Light card surface, used sparingly: warm off-white rather than pure white

Typography:

- Display and headings: Manrope or the exact open-source equivalent used by the reference
- Utility copy, labels, metadata, buttons, and navigation: Geist Mono
- Desktop hero H1 reference: approximately 80 px, weight 600, line-height 96 px
- Desktop major H2 reference: approximately 48 px, weight 500, line-height about 1.3
- Desktop utility text reference: approximately 16 px, 24 px line-height, slight positive tracking
- Mobile hero H1 reference: approximately 51 px, weight 600, line-height about 61 px
- Mobile major H2 reference: approximately 38 px, weight 500, line-height about 49 px

Do not blindly use only these values. Measure the reference and create fluid type with clamp() so the visual scale matches across breakpoints.

Visual characteristics:

- Near-black full-page background
- Warm sand text instead of sterile white
- Coral rectangular CTAs with dark text
- Thin structural borders dividing the page into large modules
- Small crosshair/plus markers at major grid intersections
- Subtle vertical organic contour-line pattern in selected hero panels
- Generous empty space
- Large editorial headlines
- Monospace labels and metadata
- Sharp cards with minimal rounding
- Occasional warm light surfaces for identity-card or content contrast
- Restrained shadows
- No gradients unless the reference demonstrably uses one
- No generic glassmorphism
- No generic SaaS dashboard visuals
- No random floating blobs

## Global layout

- Use a centered shell with a desktop maximum width close to the reference.
- Maintain thin left and right boundary lines through major page regions.
- Header height and horizontal padding must closely match the reference.
- Sections should feel like large bordered editorial panels, not isolated rounded cards.
- Preserve the reference’s generous vertical rhythm and deliberate alignment.
- Add intersection markers where horizontal and vertical grid rules meet.
- Ensure the site remains elegant at very large screens without stretching text lines excessively.

## Header and navigation

Desktop:

- Original personal monogram or wordmark on the left
- Links centered/right: HOME, WORK, BLOG, CONTACT
- Coral CTA on the far right: LET’S TALK with a diagonal arrow
- Active-link indication
- Refined hover animation in which link lettering or text layers slide/reveal, matching the reference’s feel
- Sticky or intelligently persistent behavior if confirmed from the reference

Mobile:

- Wordmark on the left
- Compact square hamburger control on the right
- Full-screen near-black menu overlay
- Large numbered links:
  - 01 Home
  - 02 Work
  - 03 Blog
  - 04 Contact
- Close button in the top-right
- Social/contact icons along the bottom
- Smooth reveal and exit animation
- Lock body scrolling while the menu is open
- Fully keyboard accessible with focus trapping, Escape-to-close, and restored focus

## Homepage

Reproduce the following sequence and visual rhythm.

### 1. Hero

Desktop:

- Two-column composition
- Left: very large multiline positioning statement, short monospace supporting line, two CTA buttons, and compact trust/availability details
- Right: a large portrait-based identity card suspended from a stylized badge clip
- The card should include my photo placeholder, name, title, availability state, signature-style detail, and optional QR/contact device
- Organic contour-line background pattern behind the content
- The card may have a restrained tilt/parallax effect and should react subtly to pointer movement

Mobile:

- Identity card appears before the headline, matching the reference’s responsive reordering
- Portrait card nearly fills the available width
- Headline stacks dramatically below it
- CTAs stack or wrap cleanly
- Do not shrink desktop content into an unreadable two-column layout

Suggested original placeholder copy:

Headline:
“Ideas shaped into memorable digital experiences.”

Supporting line:
“Independent designer and developer focused on clear, expressive products.”

Primary CTA:
“START A PROJECT”

Secondary CTA:
“VIEW MY WORK”

All personal copy must be stored in one central content/config file for easy replacement.

### 2. Work — Highlights

- Large section heading and “All Work” action
- Four highlighted projects
- Match the reference’s alternating editorial project composition and image prominence
- Each project exposes title, year, category, thumbnail/hero image, and link
- Strong image hover treatment: controlled scale, overlay, title movement, and arrow feedback
- Use original placeholder projects with clear labels such as [PROJECT TITLE]
- Never copy Noirspace project names or images

### 3. My Design Approach

- Four numbered stages with the same strong typographic hierarchy and border treatment
- Example original stages:
  - 01/ Discover Context
  - 02/ Define Direction
  - 03/ Design the Experience
  - 04/ Refine and Deliver
- Each stage has one concise sentence
- Use subtle staggered scroll reveals

### 4. Toolkit

- Large heading equivalent to “My toolkit, your advantage”
- Short supporting copy
- Animated grid or horizontal presentation of tool marks
- Only include tools I actually use once supplied
- Temporary placeholders may include Figma, Framer, React, TypeScript, Adobe tools, Rive, Notion, and ChatGPT, but keep them editable
- Use monochrome marks with refined hover states

### 5. Experience Timeline

- Large editorial section title
- Vertical/stepped career timeline
- Each record: year/range, organisation, role, short optional detail
- Use [YEAR], [ORGANISATION], and [ROLE] placeholders rather than fictional experience
- Include a resume/CV action
- Timeline must remain readable on mobile

### 6. Proof and Testimonials

- Recreate the reference’s modular “Real Stories, Real Results” composition
- Support factual metrics, client reach, availability, and one featured testimonial
- Hide any metric or testimonial whose value is empty
- Never ship the reference’s fake/demo values or names
- Clearly mark placeholder testimonial content in development
- Keep the proof and testimonial data in the local typed content files so I can replace it directly in code

### 7. Services and Pricing

- Large title equivalent to “Simple, Transparent Pricing”
- Four service cards following the same grid rhythm:
  - Website Design
  - Product/UI Design
  - Landing Page Design
  - Framer or Frontend Development
- Each card supports service name, starting price, summary, feature list, and CTA
- If prices are not supplied, show “Custom quote” rather than inventing figures
- Include a contrasting tailored-project CTA panel

### 8. FAQ

- Numbered accordion from 01 onward
- Strong heading and short introduction
- Match reference spacing, dividers, expanded-state motion, and type hierarchy
- Include editable questions about services, timeline, revisions, support, handover, tools, and starting a project
- Accessible button semantics, aria-expanded, keyboard support, and reduced-motion handling

### 9. Journal Preview

- Three latest articles
- Image, date, title, category
- “View All” action
- Image scale and title transition on hover
- All content driven by the blog data source

### 10. Footer

Recreate the reference’s oversized, structured footer:

- Personal brand and short positioning statement
- Email/newsletter field only if it is actually connected; otherwise use a direct contact CTA
- Primary page links
- Email, booking, resume, and other relevant links
- Large contact email treatment
- Social links
- Copyright/year line
- Thin borders and generous whitespace

Do not include links to Noirspace, its creator, its template store, or its social profiles.

## Work index page

Route: /works

- Same header and footer
- Patterned bordered hero
- Breadcrumb
- Large heading equivalent to “Works Crafted with Purpose”
- Category filter row
- Editorial project grid containing all projects
- Smooth animated filtering without layout jumps
- Each card shows project title and year
- Maintain image quality and consistent aspect ratios
- Add empty-state handling for categories with no projects

Suggested editable categories:

- All
- Brand Identity
- Web Design
- Product Design
- Mobile
- Development

## Work detail template

Route: /works/[slug]

Match the reference template:

- Split introductory headline and overview
- Four metadata cells:
  - Start time/year
  - Client
  - Industry or what they do
  - Live-site/external link
- Large case-study imagery
- “What I did” section
- Service/discipline tags
- Structured narrative sections:
  - Context
  - Challenge
  - Approach
  - Design system
  - Key screens or deliverables
  - Outcome
- Featured testimonial only when verified
- “More Projects” section with two related projects
- Footer

Support multiple full-width and split images, captions, optional video, and accessible alt text. Do not invent business results.

## Blog index

Route: /blog

- Patterned hero with breadcrumb and large title
- Category filters matching the work-index behavior
- Editorial list/grid of articles
- Image, publication date, title, and categories
- Responsive layout faithful to the reference
- Empty state and pagination/load-more support if needed

## Blog detail template

Route: /blog/[slug]

- Patterned hero with breadcrumb
- Large centered article title
- Date and category tags
- Prominent hero image
- Narrow readable article column
- Rich-text typography for headings, paragraphs, lists, links, quotes, images, and captions
- Table of contents when articles are long
- Related Writing section with three items
- Metadata and social preview image

Do not copy any Noirspace article text. Generate only original drafts or labeled placeholders.

## Contact page

Route: /contact

Desktop:

- Split layout matching the reference
- Left: small coral speech-bubble graphic and oversized invitation headline
- Right: minimal dark form fields

Mobile:

- Stack the introduction and form naturally
- Preserve large typography without horizontal overflow

Fields:

- Name
- Email
- Phone, optional
- Project type
- Budget range, optional
- Message

Include:

- Validation
- Loading state
- Error state
- Success state
- Spam protection/honeypot
- Server-side handling

Do not fake delivery. If no email provider is configured, show an honest fallback with a direct email link.

## 404 page

- Original on-brand 404 experience
- Same grid, color, type, and motion language
- Clear route back home and link to selected work
- No broken template links

## Motion and interaction system

Match the reference’s refined motion feel:

- Page entrances using blur-to-sharp, opacity, and controlled vertical movement
- Staggered headline line reveals
- Section content revealed as it enters the viewport
- Image mask/clip reveals
- Smooth project image scaling on hover
- Layered text/link hover movement
- CTA arrow movement
- Accordion height and opacity transitions
- Smooth category filtering
- Subtle card tilt/parallax for the identity badge
- Full-screen mobile-menu transitions
- Page transitions between index and detail views
- Optional custom cursor only if it improves usability

For every animated element, inspect the live reference and match its trigger point, start state, direction, travel distance, blur amount, opacity, duration, delay, stagger, easing curve, clipping behavior, and exit state. Do not replace the reference motion with a single generic fade-up animation. Maintain a central motion-token file so duration and easing remain consistent throughout the site.

Motion must remain restrained and premium. Target smooth 60 fps interactions. Use transforms and opacity where possible. Respect prefers-reduced-motion and provide an equivalent static experience.

## Responsive behavior

The implementation must be individually designed for:

- Wide desktop: 1440 px and above
- Desktop: 1280 px
- Small desktop/tablet landscape: 1024 px
- Tablet portrait: 768 px
- Large mobile: 430 px
- Standard mobile: 390 px
- Small mobile: 360 px

Key mobile behaviors observed in the reference:

- Desktop navigation becomes a hamburger and full-screen overlay
- Identity/portrait card moves above the hero headline
- Large headings remain visually strong instead of becoming small generic text
- Multi-column sections stack into one column
- Project cards retain large image areas
- Horizontal padding tightens while structural border lines remain visible
- Footer columns stack cleanly
- Touch targets are at least 44 px
- No horizontal overflow

## Technical implementation

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS or clean CSS modules
- Framer Motion for controlled animation
- next/image or an equivalent responsive image pipeline

Recommended content architecture:

- Central site/profile configuration
- Typed project collection
- Typed experience collection
- Typed services/pricing collection
- Typed FAQ collection
- Typed testimonials/metrics collection
- Blog collection using local MDX files

Use only local typed content modules and MDX. Do not install or prepare Sanity, Supabase, Payload, Strapi, Contentful, Firebase, a database, or any CMS integration.

Use reusable components for:

- Header
- Mobile menu
- Section frame and grid markers
- Buttons
- Project cards
- Project filters
- Article cards
- Badge/profile card
- Timeline
- Service cards
- Testimonial/proof panels
- FAQ accordion
- Footer
- Motion/reveal wrappers

## Images and asset direction

Create an `assets` or `public/images` structure with clear folders:

- portrait
- projects
- journal
- branding
- social
- textures

Use original generated placeholders where real photography is unavailable. Match the reference’s framing, crop, contrast, and art direction without copying its images. Create a reusable SVG/CSS contour-line background pattern rather than downloading the reference’s pattern.

All images need:

- Descriptive filenames
- Meaningful alt text
- Width and height metadata
- Responsive sources
- Modern formats such as WebP/AVIF where appropriate
- Lazy loading below the fold
- No visible stock watermarks

## Accessibility

- Semantic landmarks and heading hierarchy
- Keyboard-accessible navigation, filters, accordions, forms, and dialogs
- Visible focus treatment consistent with the coral accent
- Proper labels and validation messages
- Sufficient contrast
- Reduced-motion support
- Screen-reader labels for icon-only controls
- Focus trapping and Escape behavior in mobile navigation
- Skip-to-content link

## SEO and production requirements

- Unique metadata for every page
- Open Graph and Twitter/X cards
- Canonical URLs
- robots.txt
- sitemap.xml
- JSON-LD for Person, WebSite, CreativeWork/project pages, and BlogPosting where appropriate
- Favicon and app icons
- Custom social preview
- Clean URLs
- Error and loading states
- Optimized font loading
- Strong Core Web Vitals
- No console errors
- No hydration warnings
- No broken links

## Personal-content placeholders

Store all unknown information centrally and make it easy to replace:

- [YOUR NAME]
- [YOUR ROLE]
- [YOUR SHORT POSITIONING STATEMENT]
- [YOUR BIO]
- [YOUR EMAIL]
- [YOUR PHONE]
- [YOUR LOCATION]
- [YOUR AVAILABILITY]
- [YOUR CALENDAR LINK]
- [YOUR RESUME FILE]
- [YOUR SOCIAL LINKS]
- [YOUR TOOLS]
- [YOUR EXPERIENCE]
- [YOUR SERVICES]
- [YOUR PRICES OR CUSTOM QUOTE]
- [YOUR PROJECTS]
- [YOUR TESTIMONIALS]
- [YOUR VERIFIED METRICS]
- [YOUR PORTRAIT]

Hide empty optional fields rather than rendering awkward placeholders on the published website.

## Quality standard and acceptance criteria

The build is complete only when:

1. Every reference page type has been implemented.
2. Desktop and mobile layouts match the reference’s composition closely.
3. Typography, spacing, borders, grid markers, image ratios, and CTA treatment are consistent.
4. The mobile menu matches the full-screen numbered-navigation behavior.
5. Motion is smooth, restrained, and reduced-motion aware.
6. Work and blog filters function correctly.
7. Dynamic detail pages work from structured data.
8. The contact form has honest server-side behavior.
9. All content and assets are original or explicit placeholders.
10. The site passes lint, type checks, and a production build.
11. Core pages are visually tested at every required breakpoint.
12. Accessibility and keyboard navigation are tested.
13. There are no copied Noirspace names, project content, articles, photographs, personal information, creator credits, or external links.

## Required execution behavior

Work autonomously and complete the full implementation. Do not merely describe the design or stop after a scaffold. Do not ask me to repeat information that is already in this prompt. Where personal content is missing, use clearly labeled placeholders and continue building. Preserve a clear content-replacement guide in the README.

At completion, provide:

- Local project path
- Setup and run instructions
- Page/route inventory
- Asset inventory
- Content replacement guide
- Environment-variable list
- Tests and build results
- Remaining items that require my real personal information
