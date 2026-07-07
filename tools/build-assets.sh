#!/usr/bin/env sh
# ─────────────────────────────────────────────────────────────────────────────
# Niviya Interiors — media build pipeline (runs inside the niviya-tools container)
# Regenerates every web asset from the original photos/videos in /src.
# Usage (from project root):  ./dx sh tools/build-assets.sh
# ─────────────────────────────────────────────────────────────────────────────
set -eu

# Prefer project-local originals (tools/_originals) — works even when macOS
# privacy blocks the ~/Downloads bind mount. Fall back to the /src mount.
if ls /work/tools/_originals/*.jpeg >/dev/null 2>&1; then
  SRC=/work/tools/_originals
else
  SRC=/src
fi
echo "· source: $SRC"
OUT=/work/assets
IMG=$OUT/img
VID=$OUT/video
LOGO=$OUT/logo
STAGE=/tmp/stage
FONT=/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf
SERIF=/usr/share/fonts/dejavu/DejaVuSerif-Bold.ttf
LOGO_SRC=/work/tools/_review/logo-src.png

mkdir -p "$IMG" "$VID" "$LOGO" "$STAGE"

# 1) Build a number→path map (space-laden WhatsApp filenames referenced by index,
#    same sort order as the review sheets). Reading /src directly with magick works;
#    cp cannot due to macOS extended-attribute restrictions on the bind mount.
echo "· indexing originals…"
i=0; : > "$STAGE/photos.txt"
ls "$SRC"/*.jpeg | sort | while IFS= read -r f; do
  i=$((i+1)); n=$(printf "%02d" "$i")
  printf "%s\t%s\n" "$n" "$f" >> "$STAGE/photos.txt"
done
# helper: resolve staged photo number -> real /src path
photo() { awk -F'\t' -v n="$1" '$1==n{ print $2; exit }' "$STAGE/photos.txt"; }

# 2) Gallery images: slug|source-number
#    (curated from visual review of all 41 photos)
# Curated "best of" set (13). The commented lines were reviewed and cut
# (duplicates / bare / cluttered / dated). Uncomment to bring one back.
GALLERY="
kitchen-emerald-u|28
kitchen-sage-l|07
living-marble-display|31
living-geometric-balcony|37
wardrobe-sliding-suite|23
wardrobe-rose-gloss|32
pooja-lattice-brass|17
bedroom-emerald-platform|22
feature-marble-foyer|30
"
# cut: kitchen-mint-marble|15  living-onyx-ledge|21  living-gloss-tv|40
# cut: living-window-bench|19  wardrobe-white-geometric|33  wardrobe-marble-motif|36
# cut: pooja-jali-marble|08  bedroom-charcoal-headboard|09  crockery-niche-wall|38
# cut: wardrobe-arch-blush|39  decor-peacock-mural|01
# cut: pooja-arch-backlit|34  crockery-bar-display|25

echo "· building responsive gallery images…"
printf '%s\n' "$GALLERY" | while IFS='|' read -r slug num; do
  [ -z "${slug:-}" ] && continue
  s="$(photo "$num")"
  # large webp (lightbox), medium webp (grid srcset), jpg fallback
  magick "$s" -auto-orient -strip -resize 1500x1500 -quality 80 -define webp:method=6 "$IMG/$slug.webp"
  magick "$s" -auto-orient -strip -resize 760x760   -quality 78 -define webp:method=6 "$IMG/$slug-760.webp"
  magick "$s" -auto-orient -strip -resize 1280x1280 -quality 82 -interlace Plane "$IMG/$slug.jpg"
  echo "   ✓ $slug"
done

# 3) Hero (source #19 — warm living room with window view; crops well to wide) — art-directed
echo "· building hero crops…"
H="$(photo 19)"
# desktop 16:9
magick "$H" -auto-orient -strip -resize 2000x1125^ -gravity center -extent 2000x1125 -quality 82 -define webp:method=6 "$IMG/hero-desktop.webp"
magick "$H" -auto-orient -strip -resize 2000x1125^ -gravity center -extent 2000x1125 -quality 84 -interlace Plane "$IMG/hero-desktop.jpg"
magick "$H" -auto-orient -strip -resize 1280x720^  -gravity center -extent 1280x720  -quality 80 -define webp:method=6 "$IMG/hero-desktop-1280.webp"
# mobile portrait 3:4
magick "$H" -auto-orient -strip -resize 1080x1440^ -gravity center -extent 1080x1440 -quality 80 -define webp:method=6 "$IMG/hero-mobile.webp"
magick "$H" -auto-orient -strip -resize 1080x1440^ -gravity center -extent 1080x1440 -quality 83 -interlace Plane "$IMG/hero-mobile.jpg"
echo "   ✓ hero"

# 4) Contact section image (source #18 — warm window seat)
C18="$(photo 18)"
magick "$C18" -auto-orient -strip -resize 1300x1300 -quality 82 -define webp:method=6 "$IMG/contact-studio.webp"
magick "$C18" -auto-orient -strip -resize 1200x1200 -quality 83 -interlace Plane "$IMG/contact-studio.jpg"

# 5) Video reels: slug|source-number|start(s)|dur(s)|posterAt(s)
echo "· building video reels (mp4 + webm + poster)…"
i=0; : > "$STAGE/vids.txt"
ls "$SRC"/*.mp4 | sort | while IFS= read -r v; do
  i=$((i+1)); echo "$i|$v" >> "$STAGE/vids.txt"
done
# slug|source#|clip-start(s)|clip-dur(s)|posterAt(s)
# Clips are timed to the room shown in the site label (slugs are legacy ids):
#   reel-modular-kitchen  -> "Living & Dining" (v5 sofa/TV + dining table ~0:11-0:14)
#   reel-kitchen-tour      -> "Living"          (v4 sectional sofa ~0:16)
#   reel-lavender-kitchen  -> "Living"          (v2 teal living + balcony ~0:19)
#   reel-pooja-mandir      -> "Kitchen"         (v1 grey kitchen ~0:12)
REELS="
reel-modular-kitchen|5|4|13|14
reel-kitchen-tour|4|8|13|16
reel-lavender-kitchen|2|13|13|19
reel-pooja-mandir|1|6|13|12
"
printf '%s\n' "$REELS" | while IFS='|' read -r slug vnum ss dur pat; do
  [ -z "${slug:-}" ] && continue
  v=$(awk -F'|' -v n="$vnum" '$1==n{ print $2; exit }' "$STAGE/vids.txt")
  # MP4 (H.264)
  ffmpeg -nostdin -v error -y -ss "$ss" -t "$dur" -i "$v" \
    -vf "scale='min(iw,600)':-2" -an -c:v libx264 -crf 30 -preset slow \
    -movflags +faststart -pix_fmt yuv420p "$VID/$slug.mp4"
  # WebM (VP9)
  ffmpeg -nostdin -v error -y -ss "$ss" -t "$dur" -i "$v" \
    -vf "scale='min(iw,600)':-2" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 "$VID/$slug.webm"
  # poster
  ffmpeg -nostdin -v error -y -ss "$pat" -i "$v" -frames:v 1 -vf "scale='min(iw,600)':-2" "$STAGE/$slug-poster.png"
  magick "$STAGE/$slug-poster.png" -strip -quality 80 -define webp:method=6 "$IMG/$slug-poster.webp"
  magick "$STAGE/$slug-poster.png" -strip -quality 84 "$IMG/$slug-poster.jpg"
  echo "   ✓ $slug"
done

# 6) Logo (looks best on dark — the gray gradient melts into it)
echo "· building logo + favicons + OG…"
magick "$LOGO_SRC" -trim +repage -resize 720x "$LOGO/niviya-logo.png"
# favicon: crop the NJ monogram band and set on brand-dark
magick "$LOGO_SRC" -gravity center -crop 470x470+0-70 +repage -resize 512x512 \
  -background "#141210" -flatten "$LOGO/favicon-512.png"
magick "$LOGO/favicon-512.png" -resize 180x180 "$LOGO/apple-touch-icon.png"
magick "$LOGO/favicon-512.png" -resize 32x32 "$LOGO/favicon-32.png"
magick "$LOGO/favicon-512.png" -define icon:auto-resize=48,32,16 "$LOGO/favicon.ico"
# OG / social share 1200x630
magick -size 1200x630 \
  gradient:"#1c1712"-"#0c0a08" \
  \( "$LOGO_SRC" -trim +repage -resize 440x \) -gravity West -geometry +90+0 -composite \
  -font "$SERIF" -fill "#EBD9AE" -pointsize 62 -gravity West -annotate +560-40 "Designing\nTimeless Homes." \
  -font "$FONT" -fill "#9c8a63" -pointsize 24 -gravity West -annotate +562+96 "NIVIYA INTERIORS · BENGALURU" \
  "$LOGO/og-image.jpg"

echo "· done. Asset summary:"
du -sh "$IMG" "$VID" "$LOGO" 2>/dev/null
