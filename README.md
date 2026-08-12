# Editorial Bloom

THESWAYMVAR — Master Website Build Prompt

Paste this whole document into your code-generation tool (Claude Code, Cursor, etc.) as the build spec.

0. NON-NEGOTIABLE RULE — ORIGINALITY

This build is inspired by the visual language of a reference luxury wedding-photography site (composition, spacing rhythm, editorial pacing, image-to-text ratio) — it is not a clone.

Never do the following, even by accident while translating a "similar section":

Never use the reference's brand name, wordmark, or logo mark.

Never reuse the reference's exact headline copy, taglines, or body copy — write everything from scratch for theswaymvar.

Never pull the reference's actual photographs, video thumbnails, or any image URLs from it. Every image in this build comes from Pexels (see §7) or the client's own asset folder.

Never reproduce the reference's specific magazine-cover images, award-laurel graphics, or press logos — if a "as seen in / press" section is built, use generic placeholder wordmarks (plain text, e.g. "PRESS NAME") until the client supplies real logos with permission, or omit the section.

Never copy component code, class names, or CSS values 1:1 from anywhere — treat the reference only as a mood board for proportion and pacing, and re-derive every measurement.

If any generated section is directly recognizable as "the same page with different words," redo it — the goal is the same category of luxury editorial design, executed as an original site.

1. PROJECT OBJECTIVE

Build the marketing website for theswaymvar — a cinematic luxury wedding photography & films studio — with the same level of visual sophistication as top-tier international wedding-editorial studios, expressed through original content, imagery, and layout decisions.

The site should read as a quiet, expensive, editorial magazine, not a template. Every section should feel intentional: generous whitespace, restrained color, image-led storytelling, slow and cinematic motion.

2. DESIGN PRINCIPLES TO CAPTURE (not copy)

These are the underlying design mechanics worth carrying forward — reinterpret each one with original measurements, original copy, and original imagery:

Minimal editorial header — wordmark left, a short flat nav, one filled CTA button on the right, no drop shadows or heavy borders.

Full-bleed cinematic breaks — occasional full-width image or video moments between content sections, sometimes with an angular/diagonal crop framing instead of a plain rectangle, used sparingly (once or twice per page, not everywhere) as a pacing device.

Oversized ligature-style couple/portfolio typography over video — large serif display type overlaid directly on a portfolio thumbnail, with a small sans-serif eyebrow label above it and a location/date caption beneath. Used for portfolio and featured-work cards.

Press/recognition strip — a quiet row of wordmark-style logos, kept small and grayscale, never the visual focus of the page.

Asymmetric masonry grid with an embedded text tile — a portfolio grid where one grid cell is swapped for a plain-color tile containing a short editorial pull-quote instead of an image, breaking the rhythm of "image, image, image."

Recent-work strip with captions — a simple row of 3–4 images, each with a small caption (couple names + date), ending in one clear secondary CTA.

Split brand-story panel — headline in mixed serif weights/italics, paired with two images of different aspect ratios (one portrait, one landscape) and a short paragraph of brand philosophy.

Calm footer — warm background, wordmark, location line, contact details, social icons, one legal link. No dense sitemap column-dump.

3. BRAND IDENTITY — THESWAYMVAR

Name treatment: always lowercase — theswaymvar — set in the serif display face for the wordmark, letter-spaced slightly wide.

Typography:

Display / headings: Cormorant Garamond (serif) — used at large sizes, sometimes mixing regular and italic within the same headline for rhythm.

Body, nav, labels, captions: Manrope (sans-serif) — clean, restrained, generous letter-spacing on uppercase labels.

Color palette:

Warm ivory / off-white background (base)

Deep charcoal (near-black, not pure #000) for primary text

Muted taupe / warm beige for secondary surfaces and section breaks

One restrained accent — a soft bronze/champagne — used only for buttons, small dividers, and hover states, never as a large fill

Tone of voice: understated, editorial, warm — no exclamation points, no "book now!" energy. Confidence through restraint.

4. SITEMAP

Home (/)

Story (/story) — the brand/founder story

Services (/services) — signature offerings, presented editorially

Work (/work) — portfolio index (masonry grid)

Work detail (/work/:slug) — individual wedding story page

Testimonials (/testimonials)

No Awards/Press, Blog, Pricing, or FAQ pages.

5. PAGE-BY-PAGE SECTION BREAKDOWN

5.1 Home

Header — fixed/sticky, transparent over hero, solidifies on scroll. Wordmark left, nav (Story, Services, Work, Testimonials) center-right, "Inquire" or "Get In Touch" button far right (WhatsApp CTA, see §11).

Hero — Joy-style split layout (per brand decision):

Two-column composition on desktop: left column holds a short eyebrow label, a large serif headline (2–3 lines, mixed weight), a one-line subtext, and a CTA button; right column holds an overlapping photo composition (a primary image with a smaller secondary image or info card overlapping its corner) set against a subtle background botanical/line-art motif.

On mobile, stack: headline block first, image composition below, full-width.

Brand intro line — one centered short editorial sentence introducing the studio's philosophy, generous vertical whitespace above and below.

Featured work (editorial cards) — 2–3 large portfolio/video-style cards, each with an oversized serif couple-name or wedding-title overlay, a play affordance if it represents a film, and a small location/date caption. Cards vary in width (not a uniform grid).

Philosophy / brand-story teaser — split panel: short paragraph + two images of differing aspect ratio, linking through to /story.

Signature services teaser — three services presented as an editorial list (large numeral or serif label + one-line description each) rather than icon cards, linking to /services.

Selected testimonial — one large pull-quote, centered, minimal attribution line, linking to /testimonials.

Recent weddings strip — 4 images in a row, caption under each (couple names + date), one secondary CTA beneath ("View Full Portfolio").

Inquiry CTA band — full-width, quiet background color shift, short headline + WhatsApp CTA button.

Footer — wordmark, city/location line, phone, email, social icons, one privacy link.

5.2 Story

Full-bleed cinematic opening image or short looping clip with a large serif overline (an original phrase — do not reuse "Soul + Cinema" or any reference wording).

Founder/brand narrative in 2–3 short editorial blocks, each paired with one image, alternating text-left/image-right and image-left/text-right for rhythm.

Optional numbers/credentials line (years active, countries/cities shot, weddings documented) set in small caps, understated — not styled as award laurels.

Closing CTA into /work.

5.3 Services

Short intro paragraph.

Each signature service (e.g., Full Wedding Coverage, Pre-Wedding Films, Destination Weddings, Same-Day Edit) presented as its own editorial section: large serif service name, one supporting image, a short descriptive paragraph — not a pricing table or icon-grid.

Closing inquiry CTA.

5.4 Work (portfolio index)

Short intro line ("A selection of weddings we've had the honor of documenting" — write an original version of this).

Masonry grid: varied image sizes (some tall portrait, some wide landscape, some square), with one tile replaced by a plain-color pull-quote tile breaking the pattern, per §2.5.

Each grid tile is clickable through to /work/:slug.

No infinite scroll needed for the demo — a static curated set is fine.

5.5 Work detail (/work/:slug)

Full-bleed opening image, couple names in large serif type, location + date caption.

Short editorial narrative of the day.

A varied-size image gallery (not a uniform grid) telling the story chronologically.

"Next Story" link at the bottom.

5.6 Testimonials

A stacked list of large pull-quotes, generous whitespace between each, small attribution (names + wedding location) under each — no card borders, no star ratings, no review-site styling.

6. SPACING SYSTEM

Define distinct scales rather than one spacing value everywhere:

Micro (within a component — label to value, icon to text): 4–12px

Component (heading to paragraph, paragraph to button): 16–32px

Section (between stacked sections on a page): 96–160px desktop, 56–88px mobile

Major editorial break (before/after a full-bleed cinematic moment): 160–240px desktop, 80–120px mobile

Keep left/right page margins consistent site-wide (e.g., a max content width around 1280–1440px, centered, with fluid outer gutters); let only the deliberate full-bleed moments break the container.

7. IMAGE SYSTEM

All images sourced as Pexels placeholder images (cinematic, premium, editorial Indian/South Asian wedding imagery — couples, details, venues) — never scraped from any reference site.

Organize images in a centralized local asset/data file (e.g., src/data/images.ts) mapping semantic keys (hero.primary, work.slug-1.cover, etc.) to URLs, so every image is one-to-one swappable with final client photography later without touching layout or component code.

Vary image treatment deliberately: some full-bleed, some contained, some portrait-cropped, some landscape — avoid a repeating uniform grid anywhere except the intentional masonry portfolio (§5.4), which itself varies sizes.

8. ANIMATION SYSTEM

Stack: Framer Motion for component-level transitions, GSAP + ScrollTrigger for scroll-driven reveals and pinned/parallax moments, Lenis for smooth scroll.

Use, subtly and slowly:

Fade + slight rise on section entry

Image scale-in on scroll (very slight, 1.0 → 1.03)

Text reveal (mask or opacity) for large headlines

Gentle parallax on full-bleed hero/break images

Soft hover states on portfolio cards (slight scale or image shift, no bounce)

Avoid: bounce easing, constant idle animation, aggressive page-transition effects, spinner-heavy loading states.

9. RESPONSIVE RULES

Redesign each section's composition for mobile rather than shrinking desktop proportions — e.g., the Home hero's overlapping image/info-card composition should restack cleanly, not just scale down.

Preserve varied image sizing on mobile (avoid collapsing the masonry into one repeating column width) — alternate wide/tall tiles even in a single-column mobile layout.

Keep type scale legible and restrained on mobile — cap the largest mobile headline size well below the desktop hero size.

No horizontal scroll/overflow anywhere.

10. TECHNICAL STACK & CONSTRAINTS

React + TypeScript + Vite

Tailwind CSS + custom CSS where needed for editorial typography control

Framer Motion, GSAP (with ScrollTrigger), Lenis

React Router for the 6 routes above

Lucide React for the small icon set (social icons, play affordance, chevrons)

No backend, no API, no database — fully static frontend

Before generating new code: inspect the existing project structure, components, styling, typography, and animation setup already in the repo, and reuse existing components/utilities where they already exist rather than duplicating them

11. CONTACT / INQUIRY

Every CTA button that isn't internal navigation (e.g., "Get In Touch," "Inquire") should open a WhatsApp click-to-chat link (https://wa.me/<number>?text=<prefilled message>) rather than a contact form.

12. QUALITY CHECKLIST BEFORE CALLING IT DONE

 Nothing on the site — copy, image, logo, or layout — is directly traceable to the reference site as "the same page with new words."

 Hero feels cinematic and matches the agreed Joy-style split composition.

 Section spacing follows the four-tier scale in §6, not one repeated value.

 Image sizes vary intentionally across every gallery/grid — no uniform 3-column card grid anywhere.

 Typography contrast comes from size/weight/italic mixing within the Cormorant Garamond + Manrope pairing, not from adding new fonts.

 Only the 6 routes in §4 exist — no stray Awards/Press/Blog/Pricing/FAQ pages.

 All CTAs route to WhatsApp, not a contact form.

 Images pull from the centralized asset file (§7), one-to-one swappable later.

 Mobile layout is a deliberate redesign per section, not a shrunk desktop copy — no horizontal overflow.

 Animations are slow, subtle, and never distract from photography/typography.

 Nothing looks like a generic template — if a section reads as generic, redesign it before finishing.THESWAYMVAR — Full Master Build Prompt (Gemini-ready)

Paste this entire document into Gemini as one build spec. It reproduces the same section order, same composition patterns, and same pacing as the reference luxury wedding site — with 100% original theswaymvar content, copy, and imagery, so it's a genuinely new site rather than a copy.

0. RULE — SAME STRUCTURE, ORIGINAL EVERYTHING INSIDE IT

Match section order, layout proportions, composition style, and pacing exactly as described below. Never match: exact wording, exact photographs, any real brand's logo/wordmark, real press-outlet logos, real award-body names, or any real people's photos. Wherever the reference used a real magazine logo, a real award laurel from a named publication, or a specific celebrity photo, this build uses a generic placeholder version (plain-text wordmark, generic laurel + placeholder award text, and original Pexels photography) that can be swapped for the client's real assets later.

1. GLOBAL SYSTEM

Stack: React + TypeScript + Vite, Tailwind CSS + custom CSS, Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll, React Router, Lucide React icons. No backend/API/DB.

Typography:

Display/headings: Cormorant Garamond — mix regular/italic within a single headline for editorial rhythm (as the reference does with its display type).

Body/nav/labels: Manrope, generous tracking on uppercase micro-labels.

Color: warm ivory base, deep charcoal text, muted taupe/beige section-break backgrounds, one restrained bronze/champagne accent (buttons, dividers, hover states only).

Images: sourced from Pexels, mapped through a central src/data/images.ts so every image is one-to-one swappable later. Vary aspect ratio deliberately per section (never a repeating uniform grid except where noted).

Spacing scale: micro 4–12px · component 16–32px · section 96–160px desktop / 56–88px mobile · major break 160–240px desktop / 80–120px mobile.

Motion: slow fade/rise on scroll entry, subtle image scale (1.0→1.03) on scroll, soft text reveal on large headlines, gentle parallax on full-bleed images, no bounce/no idle animation.

Global header: fixed, transparent over the hero and turning solid on scroll. Wordmark theswaymvar (lowercase, serif, letter-spaced) on the left. Flat nav — Story · Services · Work · Testimonials — centered/right. Small social icon set. One filled bronze "Get In Touch" button on the far right that opens WhatsApp click-to-chat (https://wa.me/<number>).

2. SECTION 1 — HERO (full-bleed cinematic portrait)

Composition: full-viewport-height, full-bleed black-and-white photograph of a couple in close, intimate framing (faces close together, soft smiling expression), with a subtle fine film-grain texture overlay across the whole image for a cinematic negative-scan feel. No gradient overlay box — the header nav sits directly on top of the photo with enough contrast from the grain/darkening to stay legible.

Typography over image: none needed in the hero itself beyond the header — let the photograph carry the opening moment, exactly like the reference's restraint (its hero is just the photo + header, no big headline stacked on top).

Scroll cue: a thin down-chevron or short vertical line, centered at the bottom edge, fading in after a short delay.

Mobile: same full-bleed treatch, crop to a tighter/more vertical framing of the same photo concept; header collapses to wordmark + hamburger + WhatsApp icon.

3. SECTION 2 — BRAND / PHILOSOPHY SPLIT PANEL

Composition: two-column layout. Right side: one large portrait-orientation photograph (a couple at a scenic outdoor location, editorial framing) bleeding to the page's right edge. Left side, layered partly under/beside it: a smaller square or 4:5 photograph (an intimate detail or candid moment) positioned lower, offset — echoing the reference's overlapping-image trick from its "Modern Approach" section.

Copy block: below/left of the images — an eyebrow label ("Our Approach" or similar original phrasing), then a large serif headline mixing weights (e.g., regular + italic across two lines), then 2 short paragraphs of original brand-philosophy copy (craftsmanship, timelessness, editorial storytelling — written fresh, not paraphrased from any source), then a small stat/credential line (years active, weddings shot, countries) in uppercase Manrope, understated — no laurel graphics here.

Press strip beneath: a single row of 5–6 small grayscale generic wordmark placeholders ("PUBLICATION NAME" styled as a serif logotype), evenly spaced, low visual weight — structurally the same device as the reference's magazine-logo row, content genericized until real logos are licensed.

Mobile: stack images first (large photo, then offset smaller photo below-left as a partial overlap), then the copy block, then the press strip as a horizontally scrollable row.

4. SECTION 3 — MASONRY "SIGNATURE MOMENTS" GRID

Composition: a 5-column masonry-style grid (desktop) mixing full-color and black-and-white photographs at varied sizes — some tall portrait tiles spanning 2 rows, some standard tiles, one wide landscape tile. In the visual center of the grid, replace one image tile with a flat-color text tile carrying a short original pull-quote in large italic serif (e.g., "moments worth keeping forever" — write an original line), echoing the reference's embedded quote-tile trick.

Grid rhythm: large → small → whitespace gap → portrait → large → (quote tile) → landscape → portrait, avoiding any repeating uniform pattern.

Mobile: collapse to 2 columns, preserving alternating tall/short tile heights and keeping the quote tile in its own full-width row for emphasis.

5. SECTION 4 — RECENT WEDDINGS STRIP

Composition: a single row of 4 photographs, equal width, each a different couple/venue, each with a small caption beneath: couple names (placeholder/generic names or client's real future couples) + date, set in small serif + Manrope date line — matching the reference's caption pattern exactly.

CTA: one centered secondary button below the row, bronze-outline style, original label ("View the Full Portfolio" or similar), linking to /work.

Mobile: horizontal snap-scroll carousel of the 4 images, captions beneath each.

6. SECTION 5 — FULL-BLEED DIAGONAL CINEMATIC BREAK

Composition: this is the most distinctive structural device to reproduce — a full-width black-and-white photograph (a couple embracing/dancing, candid, low light with bokeh) presented inside an angular parallelogram frame: the image's top and bottom edges are cut on a diagonal rather than a straight horizontal line, with the ivory page background showing as triangular negative space in the top-left and bottom-right corners. This creates the same "tilted cinematic frame" moment as the reference's "Soul + Cinema" section.

Overlay copy: centered on the image, a large serif headline in original wording (two short words joined by "+", e.g., an original phrase in the spirit of "storytelling that stays" — do not reuse the reference's actual phrase), followed by 2–3 lines of small white/light body copy describing the studio's range (years active, countries/regions covered, storytelling ethos) — original wording throughout.

Implementation note: achieve the diagonal frame with a CSS clip-path: polygon(...) on the image container, not an actual rotated image file, so it stays responsive.

Mobile: reduce the diagonal angle so more of the image remains visible in a taller mobile viewport; keep the overlay text centered and legible.

7. SECTION 6 — RECOGNITION / FILM HIGHLIGHTS

Composition:

Top: a centered section label ("Recognition" or similar), then a row of 4 generic laurel-wreath badges (simple original SVG laurel icon + placeholder text lines: "Award Category," "Year," "Award Body") — structurally the same device as the reference's award-laurel row, but populated with placeholder/generic text until the client supplies real accolades.

Below: two large video-thumbnail cards side by side, each with a centered play affordance, each paired underneath with an original short editorial write-up (2 short paragraphs) about that particular wedding film's story — written fresh, evoking emotion and craftsmanship the way the reference's write-ups do, without reusing any of their actual sentences.

CTA button beneath, centered, original label ("Watch Our Films") linking to a films/portfolio view.

Mobile: laurel row becomes a horizontal scroll strip; the two video+text pairs stack vertically.

8. SECTION 7 — FEATURED FILMS GRID (2×2)

Composition: an intro line above the grid (original phrasing, e.g., "A few of the stories we've had the honor of telling"), then a 2×2 grid of large video-thumbnail cards. Each card: a full-bleed still from the film, a play button centered, and oversized ligature-style serif type overlaid directly on the image showing the couple's names (large, tightly kerned, sometimes overlapping letterforms for a stylized wordmark feel — matching the reference's typographic treatment), with a small sans-serif studio label above it and, where relevant, a location caption below.

Grid variation: alternate aspect ratios slightly between cards (not perfectly uniform) so the grid doesn't feel like a stock template.

Mobile: single column, full-width cards stacked, same type-overlay treatment scaled down proportionally.

9. SECTION 8 — AS SEEN IN + SIGNATURE REELS

Composition:

A row of 6–7 small generic press-wordmark placeholders (reuse the same generic-logo component as §3, different arrangement/size if useful for rhythm).

Below: two large side-by-side video reel cards (similar treatment to §8 but bigger, more cinematic, possibly with a subtle destination/venue caption like "Lake Como, Italy" — generic/original locations only), each with the ligature-name overlay and play button, echoing the reference's large dual-reel showcase.

Mobile: logos row scrolls horizontally; the two reel cards stack full-width.

10. SECTION 9 — PREMIUM SUB-OFFERING CALLOUT

Composition: mirrors the reference's cross-promotional "Ibtida" moment — a full-bleed engagement/editorial photograph on the right two-thirds of the section, with a translucent/soft-contrast text block on the left third: a large serif italic eyebrow line, then original copy (3–4 short sentences) introducing theswaymvar's premium/fine-art tier of coverage as an invitation-only or curated offering, then a bronze-outline button with original label ("Explore [tier name]") — but this can link to an anchor on /services rather than a separate sub-site, since theswaymvar's sitemap keeps this within the main site rather than spinning off a second domain.

Mobile: stack — headline/copy/button block first, full-bleed photo beneath.

11. SECTION 10 — FOOTER

Composition: warm ivory background, three-column layout on desktop: wordmark + tagline on the left; city/location line + a privacy-policy link in the center; phone number + email + social icon row on the right. Thin top border in charcoal, generous vertical padding (matching the reference's calm, uncluttered footer).

Mobile: stack all three columns centered, wordmark first.

12. OTHER ROUTES (unchanged from earlier scope)

/story — extended brand narrative, alternating text/image blocks.

/services — each signature service as its own editorial section (large serif name + one image + short paragraph), includes the premium-tier anchor referenced in §10.

/work — the masonry portfolio grid (same visual system as §4) as a dedicated page with more tiles; each tile links to /work/:slug.

/work/:slug — full-bleed opener, couple names in large serif, narrative + varied-size gallery, "Next Story" link.

/testimonials — stacked large pull-quotes, generous whitespace, no card borders or star ratings.

13. QUALITY CHECKLIST

 Section order on Home matches §2–§11 exactly, top to bottom.

 Hero is the full-bleed grainy B&W portrait treatment, not a split/Joy-style layout.

 The diagonal clip-path break (§6) is implemented with CSS clip-path, stays responsive.

 Masonry grid (§4) has exactly one quote-tile breaking the image pattern.

 Press logos and award laurels are generic/placeholder, not real outlet or award-body names/marks.

 Every couple name, testimonial, and film write-up is original writing — nothing paraphrased from any reference.

 All images route through the central images.ts data file.

 All external CTAs open WhatsApp, not a form.

 Mobile version re-composes each section intentionally (see per-section mobile notes) rather than just shrinking desktop widths.

 Motion stays slow and subtle throughout — no bounce, no constant idle animation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/86f1119a-8a87-450b-adce-e6b8ccebb7f4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
