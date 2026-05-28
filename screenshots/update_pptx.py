#!/usr/bin/env python3
"""
Add Lightning Pass demo screenshots to the Beach Club pitch deck.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor as RgbColor
import os

# Paths
PPTX_PATH = '/Users/moderndavinci/Desktop/lightning-pass-beach-club-pitch.pptx'
SCREENSHOTS_DIR = '/Users/moderndavinci/Desktop/Applications/Lightning-Project/Lightning-App/screenshots'
OUTPUT_PATH = '/Users/moderndavinci/Desktop/lightning-pass-beach-club-pitch.pptx'

# Colors
DARK_BG = RgbColor(10, 10, 15)
NEON_GREEN = RgbColor(57, 255, 20)
ELECTRIC_BLUE = RgbColor(0, 212, 255)
LIGHTNING_YELLOW = RgbColor(255, 221, 0)

def add_demo_slides(prs):
    """Add demo slides with screenshots after slide 3 (What Lightning Pass Does)"""

    # Get the default layout (only one available)
    blank_layout = prs.slide_layouts[0]

    # Slide dimensions
    slide_width = prs.slide_width
    slide_height = prs.slide_height

    # ============================================
    # SLIDE: Customer Flow Demo
    # ============================================
    slide = prs.slides.add_slide(blank_layout)

    # Dark background
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, slide_width, slide_height
    )
    background.fill.solid()
    background.fill.fore_color.rgb = DARK_BG
    background.line.fill.background()

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12), Inches(0.6))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Customer RSVP Flow"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "30 seconds from landing page to confirmed VIP pass with QR code"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Add flow screenshots (4 key screens)
    flow_screens = [
        ('flow-01-landing.png', 'Event Landing'),
        ('flow-03-tier-vip-selected.png', 'Tier Selection'),
        ('flow-08-checkout-stripe.png', 'Stripe Checkout'),
        ('flow-10-pass-qr.png', 'Confirmed Pass'),
    ]

    x_start = 0.4
    y_pos = 1.4
    img_width = 2.1
    img_height = 4.5
    gap = 0.9

    for i, (filename, label) in enumerate(flow_screens):
        img_path = os.path.join(SCREENSHOTS_DIR, filename)
        if os.path.exists(img_path):
            x_pos = x_start + i * (img_width + gap)

            # Phone frame (rounded rect simulation)
            frame = slide.shapes.add_shape(
                MSO_SHAPE.ROUNDED_RECTANGLE,
                Inches(x_pos - 0.05), Inches(y_pos - 0.05),
                Inches(img_width + 0.1), Inches(img_height + 0.1)
            )
            frame.fill.solid()
            frame.fill.fore_color.rgb = RgbColor(30, 30, 35)
            frame.line.color.rgb = RgbColor(60, 60, 70)

            # Screenshot
            slide.shapes.add_picture(img_path, Inches(x_pos), Inches(y_pos), width=Inches(img_width))

            # Label
            label_box = slide.shapes.add_textbox(Inches(x_pos), Inches(y_pos + img_height + 0.15), Inches(img_width), Inches(0.3))
            tf = label_box.text_frame
            p = tf.paragraphs[0]
            p.text = label
            p.font.size = Pt(11)
            p.font.color.rgb = RgbColor(180, 180, 180)
            p.alignment = PP_ALIGN.CENTER

            # Arrow between screens
            if i < len(flow_screens) - 1:
                arrow_box = slide.shapes.add_textbox(
                    Inches(x_pos + img_width + 0.2),
                    Inches(y_pos + img_height/2 - 0.2),
                    Inches(0.5), Inches(0.4)
                )
                tf = arrow_box.text_frame
                p = tf.paragraphs[0]
                p.text = "→"
                p.font.size = Pt(24)
                p.font.color.rgb = NEON_GREEN

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  Customer Flow Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: Customer RSVP Flow slide")

    # ============================================
    # SLIDE: DJ Experience Demo
    # ============================================
    slide = prs.slides.add_slide(blank_layout)

    # Dark background
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, slide_width, slide_height
    )
    background.fill.solid()
    background.fill.fore_color.rgb = DARK_BG
    background.line.fill.background()

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12), Inches(0.6))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "DJ Song Request System"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Guests pay $3–$25 to request songs. DJ sees queue. Venue keeps 80%."
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Guest request screen (mobile)
    guest_path = os.path.join(SCREENSHOTS_DIR, 'dj-song-request-guest.png')
    if os.path.exists(guest_path):
        slide.shapes.add_picture(guest_path, Inches(0.5), Inches(1.4), width=Inches(2.3))
        label = slide.shapes.add_textbox(Inches(0.5), Inches(6.3), Inches(2.3), Inches(0.3))
        tf = label.text_frame
        p = tf.paragraphs[0]
        p.text = "Guest Request Screen"
        p.font.size = Pt(11)
        p.font.color.rgb = RgbColor(180, 180, 180)
        p.alignment = PP_ALIGN.CENTER

    # DJ Dashboard (desktop)
    dash_path = os.path.join(SCREENSHOTS_DIR, 'dj-dashboard.png')
    if os.path.exists(dash_path):
        slide.shapes.add_picture(dash_path, Inches(3.2), Inches(1.4), width=Inches(6.5))
        label = slide.shapes.add_textbox(Inches(3.2), Inches(5.3), Inches(6.5), Inches(0.3))
        tf = label.text_frame
        p = tf.paragraphs[0]
        p.text = "DJ Dashboard — Queue, Tips, Play Controls"
        p.font.size = Pt(11)
        p.font.color.rgb = RgbColor(180, 180, 180)
        p.alignment = PP_ALIGN.CENTER

    # Stats callout
    stats_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(10), Inches(1.4), Inches(2.8), Inches(1.5)
    )
    stats_box.fill.solid()
    stats_box.fill.fore_color.rgb = RgbColor(20, 30, 20)
    stats_box.line.color.rgb = NEON_GREEN

    stats_text = slide.shapes.add_textbox(Inches(10.1), Inches(1.5), Inches(2.6), Inches(1.3))
    tf = stats_text.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Tonight's Tips"
    p.font.size = Pt(12)
    p.font.color.rgb = RgbColor(150, 150, 150)

    p = tf.add_paragraph()
    p.text = "$185"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = NEON_GREEN

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  DJ System Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: DJ Song Request System slide")

    # ============================================
    # SLIDE: Venue Dashboard Demo
    # ============================================
    slide = prs.slides.add_slide(blank_layout)

    # Dark background
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, slide_width, slide_height
    )
    background.fill.solid()
    background.fill.fore_color.rgb = DARK_BG
    background.line.fill.background()

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12), Inches(0.6))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Venue Admin Dashboard"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Real-time RSVPs, revenue tracking, attendee lists, and sponsor attribution"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Main dashboard
    overview_path = os.path.join(SCREENSHOTS_DIR, 'venue-01-overview.png')
    if os.path.exists(overview_path):
        slide.shapes.add_picture(overview_path, Inches(0.4), Inches(1.3), width=Inches(6.2))

    # Revenue breakdown
    revenue_path = os.path.join(SCREENSHOTS_DIR, 'venue-04-revenue-breakdown.png')
    if os.path.exists(revenue_path):
        slide.shapes.add_picture(revenue_path, Inches(6.8), Inches(1.3), width=Inches(6.2))

    # Labels
    label1 = slide.shapes.add_textbox(Inches(0.4), Inches(5.3), Inches(6.2), Inches(0.3))
    tf = label1.text_frame
    p = tf.paragraphs[0]
    p.text = "Dashboard Overview"
    p.font.size = Pt(11)
    p.font.color.rgb = RgbColor(180, 180, 180)
    p.alignment = PP_ALIGN.CENTER

    label2 = slide.shapes.add_textbox(Inches(6.8), Inches(5.3), Inches(6.2), Inches(0.3))
    tf = label2.text_frame
    p = tf.paragraphs[0]
    p.text = "Revenue Breakdown by Stream"
    p.font.size = Pt(11)
    p.font.color.rgb = RgbColor(180, 180, 180)
    p.alignment = PP_ALIGN.CENTER

    # Key metrics callouts
    metrics = [
        ("247", "RSVPs", NEON_GREEN),
        ("$570", "Ticket Revenue", LIGHTNING_YELLOW),
        ("$2,394", "Sponsor Attribution", ELECTRIC_BLUE),
    ]

    for i, (value, label, color) in enumerate(metrics):
        x = 0.5 + i * 4.3
        box = slide.shapes.add_shape(
            MSO_SHAPE.ROUNDED_RECTANGLE,
            Inches(x), Inches(5.7), Inches(3.8), Inches(1)
        )
        box.fill.solid()
        box.fill.fore_color.rgb = RgbColor(20, 20, 25)
        box.line.color.rgb = color

        text_box = slide.shapes.add_textbox(Inches(x + 0.2), Inches(5.8), Inches(3.4), Inches(0.8))
        tf = text_box.text_frame
        p = tf.paragraphs[0]
        p.text = value
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = color

        p = tf.add_paragraph()
        p.text = label
        p.font.size = Pt(12)
        p.font.color.rgb = RgbColor(150, 150, 150)

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  Venue Dashboard Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: Venue Admin Dashboard slide")

    # ============================================
    # SLIDE: White-Label Comparison (Model B)
    # ============================================
    slide = prs.slides.add_slide(blank_layout)

    # Dark background
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, slide_width, slide_height
    )
    background.fill.solid()
    background.fill.fore_color.rgb = DARK_BG
    background.line.fill.background()

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12), Inches(0.6))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Model B: White-Label Branding"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Same Sunset Bash event — your brand, your domain, your colors"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Lightning Pass branded
    lp_path = os.path.join(SCREENSHOTS_DIR, 'brand-lightning.png')
    if os.path.exists(lp_path):
        slide.shapes.add_picture(lp_path, Inches(1.5), Inches(1.4), width=Inches(2.8))

        label = slide.shapes.add_textbox(Inches(1.5), Inches(6.3), Inches(2.8), Inches(0.5))
        tf = label.text_frame
        p = tf.paragraphs[0]
        p.text = "Model A"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = NEON_GREEN
        p.alignment = PP_ALIGN.CENTER

        p = tf.add_paragraph()
        p.text = "Lightning Pass Branded"
        p.font.size = Pt(11)
        p.font.color.rgb = RgbColor(150, 150, 150)
        p.alignment = PP_ALIGN.CENTER

    # Arrow
    arrow = slide.shapes.add_textbox(Inches(5), Inches(3.5), Inches(1), Inches(0.5))
    tf = arrow.text_frame
    p = tf.paragraphs[0]
    p.text = "→"
    p.font.size = Pt(48)
    p.font.color.rgb = LIGHTNING_YELLOW
    p.alignment = PP_ALIGN.CENTER

    # Beach Club branded
    bc_path = os.path.join(SCREENSHOTS_DIR, 'brand-beach-club.png')
    if os.path.exists(bc_path):
        slide.shapes.add_picture(bc_path, Inches(6.5), Inches(1.4), width=Inches(2.8))

        label = slide.shapes.add_textbox(Inches(6.5), Inches(6.3), Inches(2.8), Inches(0.5))
        tf = label.text_frame
        p = tf.paragraphs[0]
        p.text = "Model B"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = LIGHTNING_YELLOW
        p.alignment = PP_ALIGN.CENTER

        p = tf.add_paragraph()
        p.text = "Beach Club Pass"
        p.font.size = Pt(11)
        p.font.color.rgb = RgbColor(150, 150, 150)
        p.alignment = PP_ALIGN.CENTER

    # Benefits callout
    benefits_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(10), Inches(1.4), Inches(2.8), Inches(4.5)
    )
    benefits_box.fill.solid()
    benefits_box.fill.fore_color.rgb = RgbColor(20, 25, 35)
    benefits_box.line.color.rgb = RgbColor(212, 168, 83)  # Gold

    benefits_text = slide.shapes.add_textbox(Inches(10.15), Inches(1.6), Inches(2.5), Inches(4.2))
    tf = benefits_text.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Model B Includes:"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = RgbColor(212, 168, 83)

    benefits = [
        "Your logo & colors",
        "Custom domain",
        "pass.beachclub...",
        "90/10 revenue split",
        "$5K + $500/mo"
    ]
    for b in benefits:
        p = tf.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(12)
        p.font.color.rgb = RgbColor(200, 200, 200)
        p.space_before = Pt(8)

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  White-Label Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: White-Label Comparison slide")

    # ============================================
    # SLIDE: Scanner / Entry Demo
    # ============================================
    slide = prs.slides.add_slide(blank_layout)

    # Dark background
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0, slide_width, slide_height
    )
    background.fill.solid()
    background.fill.fore_color.rgb = DARK_BG
    background.line.fill.background()

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12), Inches(0.6))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Door Scanner & Entry Confirmation"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Scanner screenshot
    scanner_path = os.path.join(SCREENSHOTS_DIR, 'venue-08-scanner.png')
    if os.path.exists(scanner_path):
        slide.shapes.add_picture(scanner_path, Inches(0.8), Inches(1.2), width=Inches(7))

    # Guest redirect screen
    redirect_path = os.path.join(SCREENSHOTS_DIR, 'flow-12-qr-redirect.png')
    if os.path.exists(redirect_path):
        slide.shapes.add_picture(redirect_path, Inches(8.5), Inches(1.2), width=Inches(2.5))

    # Labels
    label1 = slide.shapes.add_textbox(Inches(0.8), Inches(5.8), Inches(7), Inches(0.3))
    tf = label1.text_frame
    p = tf.paragraphs[0]
    p.text = "Bouncer Scanner — VIP Entry Accepted"
    p.font.size = Pt(12)
    p.font.color.rgb = RgbColor(180, 180, 180)

    label2 = slide.shapes.add_textbox(Inches(8.5), Inches(6.3), Inches(2.5), Inches(0.3))
    tf = label2.text_frame
    p = tf.paragraphs[0]
    p.text = "Guest Welcome Screen"
    p.font.size = Pt(11)
    p.font.color.rgb = RgbColor(180, 180, 180)
    p.alignment = PP_ALIGN.CENTER

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  Entry System Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: Door Scanner slide")

    return prs


def main():
    print("\n" + "="*60)
    print("⚡ LIGHTNING PASS - POWERPOINT UPDATER")
    print("="*60 + "\n")

    # Load presentation
    print(f"📂 Loading: {PPTX_PATH}")
    prs = Presentation(PPTX_PATH)
    print(f"   Found {len(prs.slides)} existing slides\n")

    # Add demo slides
    print("📸 Adding demo slides with screenshots...\n")
    prs = add_demo_slides(prs)

    # Save
    print(f"\n💾 Saving to: {OUTPUT_PATH}")
    prs.save(OUTPUT_PATH)

    print(f"\n✅ Done! Presentation now has {len(prs.slides)} slides")
    print("   5 new demo slides added with screenshots\n")


if __name__ == "__main__":
    main()
