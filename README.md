# Niviya Interiors — Website

Marketing website for **Niviya Interiors**, Bengaluru — *Designing Timeless Homes*.
A fast, fully static, single-page site (plain HTML/CSS/JS, no framework, no build step) designed to be hosted free on **GitHub Pages**.

---

## What's inside

```
niviya-interiors/
├── index.html              ← the whole site
├── assets/
│   ├── css/styles.css       ← design system + all styles
│   ├── js/main.js           ← nav, gallery filter, lightbox, reels, counters, form
│   ├── img/                 ← optimized photos (WebP + JPG) + posters   ← generated
│   ├── video/               ← compressed walkthrough reels (MP4 + WebM) ← generated
│   └── logo/                ← logo, favicons, OG share image            ← generated
├── site.webmanifest, robots.txt, sitemap.xml, .nojekyll
├── .github/workflows/deploy.yml   ← auto-deploy to GitHub Pages
└── tools/                  ← media pipeline (Docker); NOT part of the live site
```

The photo, video and logo files in `assets/` are produced by the media pipeline (below).

---

## Deploy to GitHub Pages (5 minutes)

1. **Create a repo** on GitHub named `niviya-interiors` (public).
2. From this folder:
   ```bash
   git init && git add . && git commit -m "Niviya Interiors website"
   git branch -M main
   git remote add origin https://github.com/subhraj07/niviya-interiors.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
   The included workflow (`.github/workflows/deploy.yml`) publishes on every push to `main`.
4. Your site goes live at `https://subhraj07.github.io/niviya-interiors/`.

### One find-and-replace before you ship
Replace `subhraj07` with your GitHub username in these files so social sharing and SEO use the right URL:
`index.html`, `robots.txt`, `sitemap.xml`.

> **Custom domain?** Add a file named `CNAME` containing e.g. `niviyainteriors.com`, set the DNS records GitHub shows you, then update the same URLs.

---

## The media pipeline (Docker)

All image/video processing runs **inside a container** — nothing is installed on your machine.
It reads the originals, then writes optimized WebP/JPG/MP4/WebM into `assets/`.

**Prerequisites:** Docker Desktop running.

```bash
# 1) Put the originals where the container can read them (see note below)
#    → copy the 41 photos + 5 videos into tools/_originals/
#    → copy the logo PNG to tools/_review/logo-src.png

# 2) Build every web asset (first run also builds the toolchain image)
./dx sh tools/build-assets.sh
```

`./dx` is a thin wrapper that runs a command in the `niviya-tools` image with the
project mounted at `/work`. The curated photo→slug mapping lives at the top of
`tools/build-assets.sh` — edit it to swap in different photos.

### ⚠️ macOS note (why originals are copied, not read from Downloads)
macOS privacy (TCC) blocks terminal/Docker access to `~/Downloads`. Copy the source
photos/videos into `tools/_originals/` first (drag them in Finder), or grant your
terminal **Full Disk Access** in *System Settings → Privacy & Security*. The originals
folder is git-ignored, so it never ships to the live site.

---

## Editing content

- **Copy, headings, contact numbers:** edit `index.html` directly.
- **Materials tab text / testimonials:** edit the arrays near the top of `assets/js/main.js`.
- **Colours & fonts:** the `:root` custom properties at the top of `assets/css/styles.css`.
- **Add a portfolio photo:** add a slug in `tools/build-assets.sh`, re-run the pipeline,
  then copy one gallery `<article class="card">` block in `index.html` and point it at the new slug.

## Notes
- Phones: **+91 98457 80691**, **+91 78929 57674** · Instagram **@niviyainterior** · WhatsApp **wa.me/919845780691**
- The contact form has no backend — on submit it opens WhatsApp with the details pre-filled.
- Respects `prefers-reduced-motion`; images lazy-load; hero is art-directed (portrait crop on mobile).
