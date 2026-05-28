#!/bin/bash
# Create MP4 videos from screenshots for Beach Club pitch deck

SCREENSHOTS="/Users/moderndavinci/Desktop/Applications/Lightning-Project/Lightning-App/screenshots"
VIDEOS="$SCREENSHOTS/videos"
cd "$SCREENSHOTS"

echo "🎬 Creating MP4 videos..."
echo ""

# 1. CUSTOMER FLOW (20-30 seconds)
# Show 7 screens, ~3 seconds each = 21 seconds
echo "1. Creating customer-flow.mp4..."

# Create a temporary directory for numbered files
rm -rf /tmp/flow_frames
mkdir -p /tmp/flow_frames

# Copy and rename files for ffmpeg (needs sequential numbering)
cp flow-01-landing.png /tmp/flow_frames/frame01.png
cp flow-02-tier-select.png /tmp/flow_frames/frame02.png
cp flow-03-tier-vip-selected.png /tmp/flow_frames/frame03.png
cp flow-06-info-form.png /tmp/flow_frames/frame04.png
cp flow-08-checkout-stripe.png /tmp/flow_frames/frame05.png
cp flow-09-confirmation.png /tmp/flow_frames/frame06.png
cp flow-10-pass-qr.png /tmp/flow_frames/frame07.png

# Create video: 0.33 fps = 3 seconds per image
ffmpeg -y -framerate 1/3 -i /tmp/flow_frames/frame%02d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=780:1688:force_original_aspect_ratio=decrease,pad=780:1688:(ow-iw)/2:(oh-ih)/2:black" \
  "$VIDEOS/customer-flow.mp4" 2>/dev/null

echo "   ✅ customer-flow.mp4 created"

# 2. DJ EXPERIENCE (15-20 seconds)
echo "2. Creating dj-experience.mp4..."

rm -rf /tmp/dj_frames
mkdir -p /tmp/dj_frames

cp dj-song-request-guest.png /tmp/dj_frames/frame01.png
cp dj-dashboard.png /tmp/dj_frames/frame02.png
cp dj-live-display.png /tmp/dj_frames/frame03.png

# 5 seconds per frame = 15 seconds total
ffmpeg -y -framerate 1/5 -i /tmp/dj_frames/frame%02d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
  "$VIDEOS/dj-experience.mp4" 2>/dev/null

echo "   ✅ dj-experience.mp4 created"

# 3. VENUE DASHBOARD (15-20 seconds)
echo "3. Creating venue-dashboard.mp4..."

rm -rf /tmp/venue_frames
mkdir -p /tmp/venue_frames

cp venue-01-overview.png /tmp/venue_frames/frame01.png
cp venue-03-event-detail.png /tmp/venue_frames/frame02.png
cp venue-04-revenue-breakdown.png /tmp/venue_frames/frame03.png
cp venue-06-sponsor-panel.png /tmp/venue_frames/frame04.png

# 4 seconds per frame = 16 seconds total
ffmpeg -y -framerate 1/4 -i /tmp/venue_frames/frame%02d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
  "$VIDEOS/venue-dashboard.mp4" 2>/dev/null

echo "   ✅ venue-dashboard.mp4 created"

# 4. BOUNCER SCAN (8-10 seconds)
echo "4. Creating bouncer-scan.mp4..."

rm -rf /tmp/scan_frames
mkdir -p /tmp/scan_frames

cp venue-08-scanner.png /tmp/scan_frames/frame01.png
cp flow-12-qr-redirect.png /tmp/scan_frames/frame02.png

# 5 seconds per frame = 10 seconds total
ffmpeg -y -framerate 1/5 -i /tmp/scan_frames/frame%02d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
  "$VIDEOS/bouncer-scan.mp4" 2>/dev/null

echo "   ✅ bouncer-scan.mp4 created"

# 5. WHITE-LABEL DEMO (8-12 seconds)
echo "5. Creating white-label-demo.mp4..."

rm -rf /tmp/label_frames
mkdir -p /tmp/label_frames

cp brand-lightning.png /tmp/label_frames/frame01.png
cp brand-beach-club.png /tmp/label_frames/frame02.png

# 5 seconds per frame = 10 seconds total
ffmpeg -y -framerate 1/5 -i /tmp/label_frames/frame%02d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p -vf "scale=780:1688:force_original_aspect_ratio=decrease,pad=780:1688:(ow-iw)/2:(oh-ih)/2:black" \
  "$VIDEOS/white-label-demo.mp4" 2>/dev/null

echo "   ✅ white-label-demo.mp4 created"

# Cleanup
rm -rf /tmp/flow_frames /tmp/dj_frames /tmp/venue_frames /tmp/scan_frames /tmp/label_frames

echo ""
echo "=== VIDEO MANIFEST ==="
echo ""

for video in "$VIDEOS"/*.mp4; do
  filename=$(basename "$video")
  size=$(ls -lh "$video" | awk '{print $5}')
  duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$video" 2>/dev/null | cut -d. -f1)
  resolution=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$video" 2>/dev/null)
  echo "$filename"
  echo "  Size: $size | Duration: ${duration}s | Resolution: $resolution"
  echo ""
done

echo "✅ All videos saved to: $VIDEOS"
