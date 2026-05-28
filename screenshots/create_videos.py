#!/usr/bin/env python3
"""
Create MP4 videos from screenshots using imageio
"""

import os
import imageio.v3 as iio
from PIL import Image
import numpy as np

SCREENSHOTS = '/Users/moderndavinci/Desktop/Applications/Lightning-Project/Lightning-App/screenshots'
VIDEOS = f'{SCREENSHOTS}/videos'

os.makedirs(VIDEOS, exist_ok=True)

def resize_image(img_path, target_size):
    """Resize image to target size with padding"""
    img = Image.open(img_path)
    img = img.convert('RGB')

    # Calculate scaling to fit within target while maintaining aspect ratio
    img_ratio = img.width / img.height
    target_ratio = target_size[0] / target_size[1]

    if img_ratio > target_ratio:
        # Image is wider - fit to width
        new_width = target_size[0]
        new_height = int(new_width / img_ratio)
    else:
        # Image is taller - fit to height
        new_height = target_size[1]
        new_width = int(new_height * img_ratio)

    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Create black background and paste centered
    background = Image.new('RGB', target_size, (10, 10, 15))
    paste_x = (target_size[0] - new_width) // 2
    paste_y = (target_size[1] - new_height) // 2
    background.paste(img, (paste_x, paste_y))

    return np.array(background)

def create_video(name, image_files, target_size, seconds_per_frame=3, fps=30):
    """Create video from images"""
    print(f"Creating {name}...")

    frames = []
    for img_file in image_files:
        img_path = os.path.join(SCREENSHOTS, img_file)
        if os.path.exists(img_path):
            frame = resize_image(img_path, target_size)
            # Duplicate frame for duration (seconds_per_frame * fps)
            for _ in range(seconds_per_frame * fps):
                frames.append(frame)
        else:
            print(f"  Warning: {img_file} not found")

    if frames:
        output_path = os.path.join(VIDEOS, name)
        iio.imwrite(output_path, frames, fps=fps, codec='libx264')
        size = os.path.getsize(output_path) / 1024 / 1024
        duration = len(frames) / fps
        print(f"  ✅ {name} ({size:.1f} MB, {duration:.0f}s, {target_size[0]}x{target_size[1]})")
        return True
    return False

def main():
    print("\n🎬 Creating MP4 videos from screenshots...\n")

    # Video definitions
    videos = [
        {
            'name': 'customer-flow.mp4',
            'images': [
                'flow-01-landing.png',
                'flow-02-tier-select.png',
                'flow-03-tier-vip-selected.png',
                'flow-06-info-form.png',
                'flow-08-checkout-stripe.png',
                'flow-09-confirmation.png',
                'flow-10-pass-qr.png',
            ],
            'size': (780, 1688),  # Mobile portrait
            'seconds': 3
        },
        {
            'name': 'dj-experience.mp4',
            'images': [
                'dj-song-request-guest.png',
                'dj-dashboard.png',
                'dj-live-display.png',
            ],
            'size': (1920, 1080),  # Desktop/TV
            'seconds': 5
        },
        {
            'name': 'venue-dashboard.mp4',
            'images': [
                'venue-01-overview.png',
                'venue-03-event-detail.png',
                'venue-04-revenue-breakdown.png',
                'venue-06-sponsor-panel.png',
            ],
            'size': (1920, 1080),  # Desktop
            'seconds': 4
        },
        {
            'name': 'bouncer-scan.mp4',
            'images': [
                'venue-08-scanner.png',
                'flow-12-qr-redirect.png',
            ],
            'size': (1920, 1080),  # Desktop
            'seconds': 5
        },
        {
            'name': 'white-label-demo.mp4',
            'images': [
                'brand-lightning.png',
                'brand-beach-club.png',
            ],
            'size': (780, 1688),  # Mobile portrait
            'seconds': 5
        },
    ]

    created = 0
    for v in videos:
        if create_video(v['name'], v['images'], v['size'], v['seconds']):
            created += 1

    print(f"\n✅ Created {created} videos in {VIDEOS}\n")

    # List all videos
    print("=== VIDEO MANIFEST ===\n")
    for f in os.listdir(VIDEOS):
        if f.endswith('.mp4'):
            path = os.path.join(VIDEOS, f)
            size = os.path.getsize(path) / 1024 / 1024
            print(f"{f}: {size:.1f} MB")

if __name__ == "__main__":
    main()
