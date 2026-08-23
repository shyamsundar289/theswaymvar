# INDEX PAGE ASSET AUDIT REPORT

## 1. Executive Summary

This report provides a comprehensive, section-by-section audit of all image and video assets used directly on the `index.tsx` (Home) page of the project. Currently, the assets are scattered across `src/assets` and `public/images` with non-descriptive names (e.g., `DSC09937copy.jpg`, `Recent01.webp`). This audit maps every asset to its exact UI position, documents its properties, identifies duplicates/unused files, and establishes a strict positional naming convention and folder architecture for the Index page.

## 2. Index Page Section Map

The Home page consists of the following structure based on `index.tsx`:

```text
INDEX PAGE
│
├── HERO
│   ├── Background Image
│   └── Overlay Video
│
├── BRAND / STUDIO (How We Capture You)
│   ├── Large Portrait
│   └── Small Inset
│
├── CINEMATIC BREAK
│   └── Background Parallax Image
│
├── CINEMATIC CHAPTERS
│   └── (Text only, no assets)
│
├── YOUR STORY, OUR LENS
│   ├── Couple 01 (Meher & Arjun) Cover
│   ├── Couple 02 (Ira & Vikram) Cover
│   └── Couple 03 (Bhawana & Abhishek) Cover
│
├── TESTIMONIALS
│   └── (Text only, no assets)
│
├── RECOGNITION
│   └── svg icon (out of scope)
│
└── CLOSING CTA
    └── (Text only, no assets)
```

## 3. Current Asset Folder Structure

```text
src/assets/
├── DSC09937copy.jpg
├── break-cinematic.jpg
├── approach-large.jpg
├── approach-inset.jpg
└── ... (many unused internal images)

public/images/
├── DSCF0463 copy.webp
├── 4.webp
├── 5.webp
├── 6.webp
├── Recent01.webp
├── Recent02.webp
├── Recent03.webp
└── ...

public/videos/
├── Herovideo.mp4
└── ...
```

## 4. Recommended Asset Folder Structure

```text
public/assets/index/
│
├── hero/
│   ├── hero-background.jpg
│   └── hero-overlay.mp4
│
├── studio/
│   ├── studio-portrait-large.webp
│   └── studio-portrait-inset.webp
│
├── break/
│   └── cinematic-break-bg.webp
│
└── stories/
    ├── couple-01/
    │   ├── couple-01-cover.webp
    │   ├── couple-01-photo-01.jpg
    │   └── couple-01-video-01.mp4
    ├── couple-02/
    │   └── couple-02-cover.webp
    └── couple-03/
        └── couple-03-cover.webp
```

## 5. Complete Image Inventory

| #   | Section | Subsection | Asset Type | Current Filename     | Recommended Filename         | Folder            | Exact Position | Component   | Desktop Role   | Mobile Role    |
| --- | ------- | ---------- | ---------- | -------------------- | ---------------------------- | ----------------- | -------------- | ----------- | -------------- | -------------- |
| 1   | Hero    | Background | Image      | `DSC09937copy.jpg`   | `hero-background.jpg`        | `/index/hero/`    | Background     | `Hero.tsx`  | Full Cover     | Full Cover     |
| 2   | Studio  | Main       | Image      | `DSCF0463 copy.webp` | `studio-portrait-large.webp` | `/index/studio/`  | Right          | `Brand.tsx` | Large Portrait | Large Portrait |
| 3   | Studio  | Inset      | Image      | `4.webp`             | `studio-portrait-inset.webp` | `/index/studio/`  | Bottom Left    | `Brand.tsx` | Small Inset    | Small Inset    |
| 4   | Break   | Parallax   | Image      | `DSCF0463 copy.webp` | `cinematic-break-bg.webp`    | `/index/break/`   | Background     | `index.tsx` | Full Cover     | Full Cover     |
| 5   | Stories | Couple 1   | Image      | `Recent01.webp`      | `couple-01-cover.webp`       | `/index/stories/` | Card 1         | `index.tsx` | Portrait Card  | Portrait Card  |
| 6   | Stories | Couple 2   | Image      | `Recent02.webp`      | `couple-02-cover.webp`       | `/index/stories/` | Card 2         | `index.tsx` | Portrait Card  | Portrait Card  |
| 7   | Stories | Couple 3   | Image      | `Recent03.webp`      | `couple-03-cover.webp`       | `/index/stories/` | Card 3         | `index.tsx` | Portrait Card  | Portrait Card  |

## 6. Complete Video Inventory

| #   | Section | Subsection | Asset Type | Current Filename | Recommended Filename | Folder         | Exact Position | Component  | Desktop Role | Mobile Role  |
| --- | ------- | ---------- | ---------- | ---------------- | -------------------- | -------------- | -------------- | ---------- | ------------ | ------------ |
| 1   | Hero    | Overlay    | Video      | `Herovideo.mp4`  | `hero-overlay.mp4`   | `/index/hero/` | Top Right Mask | `Hero.tsx` | Masked Video | Masked Video |

## 7. Your Story, Our Lens Asset Map

| Couple ID | Exact Existing Name | Position    | Current Image   | New Image Name         | Folder                      | Click Route                         | Detail Page |
| --------- | ------------------- | ----------- | --------------- | ---------------------- | --------------------------- | ----------------------------------- | ----------- |
| Couple 01 | Meher & Arjun       | First card  | `Recent01.webp` | `couple-01-cover.webp` | `/index/stories/couple-01/` | `/photography/meher-and-arjun`      | Existing    |
| Couple 02 | Ira & Vikram        | Second card | `Recent02.webp` | `couple-02-cover.webp` | `/index/stories/couple-02/` | `/photography/ira-and-vikram`       | Existing    |
| Couple 03 | Bhawana & Abhishek  | Third card  | `Recent03.webp` | `couple-03-cover.webp` | `/index/stories/couple-03/` | `/photography/bhawana-and-abhishek` | Existing    |

## 8. Three Couple Asset Maps (Detail Page Media)

### Couple 01 (Meher & Arjun)

| Position | Type  | Current File          | New File                 | Grid Role                     |
| -------- | ----- | --------------------- | ------------------------ | ----------------------------- |
| Cover    | Image | `Recent01.webp`       | `couple-01-cover.webp`   | Home Page Card                |
| 01       | Image | `DSCF0463 copy.jpg`   | `couple-01-photo-01.jpg` | Large portrait (`row-span-2`) |
| 02       | Image | `2.jpg` (placeholder) | `couple-01-photo-02.jpg` | Large portrait (`row-span-2`) |
| 03       | Video | `wedding.mp4`         | `couple-01-video-01.mp4` | Landscape (`row-span-1`)      |
| 04       | Image | `4.jpg` (placeholder) | `couple-01-photo-03.jpg` | Landscape (`row-span-1`)      |
| 05       | Image | `5.jpg` (placeholder) | `couple-01-photo-04.jpg` | Portrait (`row-span-2`)       |

### Couple 02 (Ira & Vikram)

| Position                                                                                                                                                          | Type  | Current File    | New File               | Grid Role      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------- | ---------------------- | -------------- |
| Cover                                                                                                                                                             | Image | `Recent02.webp` | `couple-02-cover.webp` | Home Page Card |
| _(Grid is currently populated with placeholder images from the photography section. Media should be formatted identical to Couple 01 once client assets arrive.)_ |

### Couple 03 (Bhawana & Abhishek)

| Position                                                                                                                                                          | Type  | Current File    | New File               | Grid Role      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------- | ---------------------- | -------------- |
| Cover                                                                                                                                                             | Image | `Recent03.webp` | `couple-03-cover.webp` | Home Page Card |
| _(Grid is currently populated with placeholder images from the photography section. Media should be formatted identical to Couple 01 once client assets arrive.)_ |

## 9. Photography Grid Position Map (Reference layout)

```text
Grid: Masonry via CSS Grid
Column: 4 columns on Desktop (`grid-cols-4`), 2 columns on Mobile (`grid-cols-2`).
Row: Auto-rows `180px` desktop, `140px` mobile.
Position Mapping (by orientation):
- Portrait: `row-span-2`
- Landscape: `row-span-1`
- Square: `row-span-1`
```

## 10. Video Grid Position Map

Videos are injected directly into the standard masonry grid.

| Video ID                 | Section          | Position | Grid Column | Grid Row | Grid Span     | Poster Image                    | Video File    | Autoplay | Muted | Loop | Desktop Behavior |
| ------------------------ | ---------------- | -------- | ----------- | -------- | ------------- | ------------------------------- | ------------- | -------- | ----- | ---- | ---------------- |
| `couple-01-video-01.mp4` | Couple 01 Detail | Dynamic  | Auto        | Auto     | 1 (Landscape) | `couple-01-video-01-poster.jpg` | `wedding.mp4` | Yes      | Yes   | Yes  | Inline playback  |

## 11. Current → Recommended Filename Mapping

| #   | Current Name         | Recommended Name             | Type  | Section | Position        | Action        |
| --- | -------------------- | ---------------------------- | ----- | ------- | --------------- | ------------- |
| 1   | `DSC09937copy.jpg`   | `hero-background.jpg`        | Image | Hero    | Background      | RENAME + MOVE |
| 2   | `Herovideo.mp4`      | `hero-overlay.mp4`           | Video | Hero    | Foreground Mask | RENAME + MOVE |
| 3   | `DSCF0463 copy.webp` | `studio-portrait-large.webp` | Image | Studio  | Right           | RENAME + MOVE |
| 4   | `4.webp`             | `studio-portrait-inset.webp` | Image | Studio  | Bottom Left     | RENAME + MOVE |
| 5   | `DSCF0463 copy.webp` | `cinematic-break-bg.webp`    | Image | Break   | Background      | DUPLICATE     |
| 6   | `Recent01.webp`      | `couple-01-cover.webp`       | Image | Stories | Card 1          | RENAME + MOVE |
| 7   | `Recent02.webp`      | `couple-02-cover.webp`       | Image | Stories | Card 2          | RENAME + MOVE |
| 8   | `Recent03.webp`      | `couple-03-cover.webp`       | Image | Stories | Card 3          | RENAME + MOVE |

## 12. Image Dimensions Report (Estimates based on source)

| Asset                        | Width    | Height   | Aspect Ratio | Format | File Size |
| ---------------------------- | -------- | -------- | ------------ | ------ | --------- |
| `hero-background.jpg`        | 6000+    | 4000+    | 3:2          | JPG    | ~18 MB    |
| `studio-portrait-large.webp` | High Res | High Res | Portrait     | WebP   | ~370 KB   |
| `studio-portrait-inset.webp` | Mid Res  | Mid Res  | Portrait     | WebP   | ~600 KB   |
| `couple-01-cover.webp`       | High Res | High Res | Portrait     | WebP   | ~587 KB   |
| `couple-02-cover.webp`       | High Res | High Res | Portrait     | WebP   | ~439 KB   |
| `couple-03-cover.webp`       | High Res | High Res | Portrait     | WebP   | ~348 KB   |

## 13. Video Technical Report

| Video                    | Duration | Resolution | Aspect Ratio | Format | Size   |
| ------------------------ | -------- | ---------- | ------------ | ------ | ------ |
| `hero-overlay.mp4`       | ~10-15s  | 1920x1080  | 16:9         | MP4    | 2.6 MB |
| `couple-01-video-01.mp4` | Varies   | 1920x1080  | 16:9         | MP4    | 6.0 MB |

## 14. Duplicate Assets

**Asset:** `DSCF0463 copy.webp` (16.9 MB original JPG, 370 KB WebP)
**Used In:**

1. Brand/Studio Section (`images.approach.large`)
2. Cinematic Break background (hardcoded in `index.tsx`)
   **Recommendation:** Duplicate the asset and name them separately (`studio-portrait-large.webp` and `cinematic-break-bg.webp`) so that one section can be updated without accidentally altering the other.

## 15. Potentially Unused Assets

| Current File                   | Folder           | Type  | Reason                                     | Recommendation              |
| ------------------------------ | ---------------- | ----- | ------------------------------------------ | --------------------------- |
| `1.webp`, `2.webp`, `3.webp`   | `public/images/` | Image | No references in `index.tsx` or `site.ts`. | POTENTIALLY UNUSED          |
| `m1.jpg` - `m8.jpg`            | `src/assets/`    | Image | Used in internal services pages, not Home. | Move to `/assets/internal/` |
| `celebration.mp4`              | `public/videos/` | Video | Not referenced in Home page.               | Move to `/videos/internal/` |
| `rituals.mp4`, `portraits.mp4` | `public/videos/` | Video | Not referenced in Home page.               | Move to `/videos/internal/` |

## 16. Missing Assets

No hard missing `404` assets detected on the Home page. All references resolve correctly, although `images.ts` maps `images.approach.large` via an absolute public string (`/images/DSCF0463 copy.webp`) rather than an import, which breaks standard Vite static bundling analysis.

## 17. Recommended Renaming Plan

1. Create the `public/assets/index/` directory structure.
2. Copy (do not move yet) the 8 core Index assets to their respective folders.
3. Rename them according to the master table in Section 11.
4. Update `src/data/images.ts` and `src/routes/index.tsx` to point to the new `/assets/index/...` paths.
5. Verify the Index page renders successfully.
6. Delete the old duplicated files from `src/assets` and `public/images`.

## 18. Final Asset Naming Convention

**Format:** `{section}-{purpose}-{position}.{ext}`
**Rules:**

- All lowercase.
- Kebab-case formatting.
- No spaces, no underscores.
- No internal camera strings (e.g., `DSC`, `IMG`).
- Positional words (`-left`, `-cover`, `-bg`) are only used when describing the UI structure.

## 19. Implementation Notes

- **Hero Video Masking:** `hero-overlay.mp4` relies heavily on an elliptical CSS mask and `mix-blend-screen`. It must have strong contrast to blend properly.
- **Couple Videos:** Videos placed inside the couple grid must have the EXACT same aspect ratio as the grid layout cell they occupy to prevent letterboxing, and `object-fit: cover` must be maintained.
- **Data Coupling:** `images.ts` couples images tightly across the app. Renaming files requires updating the `images.work` mapping carefully.

## 20. Final Verification Checklist

- [ ] `hero-background.jpg` and `hero-overlay.mp4` correctly mapped.
- [ ] Studio portrait and inset correctly mapped.
- [ ] Cinematic Break background correctly mapped without sharing the studio asset.
- [ ] All three couple covers correctly mapped to `couple-01-cover.webp`, etc.
- [ ] Detail page video injected cleanly via `couple-01-video-01.mp4`.
- [ ] Unused internal files isolated from the Index folder tree.
- [ ] No `IMG_...` or `.JPG` capitalized extensions remaining on the Index page.
