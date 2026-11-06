# Anne Jumper — Engineering Portfolio

Static site built with [Astro](https://astro.build), deployed to GitHub Pages.

## Run it locally

```sh
npm install        # first time only
npm run dev        # http://localhost:4321, auto-reloads as you edit
npm run build      # production build into dist/
npm run preview    # serve the production build
```

The dev server marks any field Claude guessed with a yellow **DRAFT/GUESS** tag. These tags never appear on the published site.

## Where things live

| To change… | Edit |
|---|---|
| A project's text, images, videos, PDFs | `projects/<slug>/info.md` (+ files in that folder) |
| Home intro, email, LinkedIn | `src/data/site.ts` |
| Colors, fonts, spacing | `src/styles/global.css` (tokens at the top) |
| Page layouts | `src/pages/*.astro`, `src/components/*.astro` |
| Résumé | replace `site-pages/resume.pdf` (the page preview image regenerates automatically on the next `npm run dev` / `build`) |

Content and layout are kept separate. To restyle, edit only `src/`; projects/ is untouched.

## Adding a project

1. Create `projects/<new-slug>/` with `hero.jpg` (the card image), a `media/` folder of images, and an `info.md`.
2. Copy the frontmatter from any existing project and fill it in. The fields:

```yaml
---
title: "Project Name"
summary: "One line shown on cards and under the title."
categories: ["Design", "Simulation"]   # filter chips: Design, Simulation, Robotics & Electronics, Dynamics, CAD, Fabrication, Research
tools: ["SolidWorks", "MATLAB"]
course: "Engineering Design II"
date: "Fall 2025"                       # shown on the page
sortDate: "2025-12"                     # YYYY-MM, controls ordering
team: "Team of 4"
role: "Drivetrain lead"
featured: 0                             # 1–6 = shown on the home page in that order; 0 = not featured
hero: "./hero.jpg"
heroAlt: "What the hero image shows"
gallery:
  - src: "./media/photo1.jpg"
    caption: "Optional caption"
    group: "Optional sub-heading"
videos:
  - title: "Video Demonstration"
    youtube: "https://youtu.be/XXXXXXXXXXX"   # YouTube, or…
    file: "media/videos/demo.mp4"             # …self-hosted MP4 (keep under ~20 MB; see below)
    poster: "./media/videos/demo.jpg"
documents:
  - title: "Project Report"
    file: "docs/project-report.pdf"
links:
  - label: "GitHub repo"
    url: "https://github.com/…"
guessed: []
---

Writeup goes here in Markdown. Use `## Headings` for sections.
```

Rough notes are fine. Claude can turn them into a writeup.

## Videos

- **YouTube:** paste the URL into `youtube:`. The page shows a thumbnail and loads the player (youtube-nocookie.com) only when clicked. If `youtube` is set, it's used instead of `file`.
- **Self-hosted MP4:** compress first. GitHub rejects files over 100 MB:
  ```sh
  ffmpeg -i input.mov -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 27 -preset slow -movflags +faststart -c:a aac -b:a 96k media/videos/name.mp4
  ffmpeg -ss 1 -i media/videos/name.mp4 -frames:v 1 media/videos/name.jpg   # poster
  ```

## Privacy

`npm run dev` and `npm run build` first run `scripts/sync-assets.mjs`. It removes EXIF metadata, including **GPS location**, from any photo in `projects/`, and corrects rotation. Phone photos are safe to drop in.

## Deploying (GitHub Pages)

1. Create a GitHub repo, then push this folder to its `main` branch. Name it `<username>.github.io` to serve the site at the root URL, or use any name to get `<username>.github.io/<repo>`.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`). The site URL and base path are detected automatically.

Excluded from git (see `.gitignore`): `_upload-to-youtube/` (full-size originals), `_source-media/`, `_scrape/`, build output.
