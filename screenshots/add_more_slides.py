#!/usr/bin/env python3
"""
Add more demo slides to the Beach Club pitch deck.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor as RgbColor
import os

PPTX_PATH = '/Users/moderndavinci/Desktop/lightning-pass-beach-club-pitch.pptx'
SCREENSHOTS_DIR = '/Users/moderndavinci/Desktop/Applications/Lightning-Project/Lightning-App/screenshots'

DARK_BG = RgbColor(10, 10, 15)
NEON_GREEN = RgbColor(57, 255, 20)
ELECTRIC_BLUE = RgbColor(0, 212, 255)
LIGHTNING_YELLOW = RgbColor(255, 221, 0)

def add_more_slides(prs):
    """Add DJ Live Display and Sponsor Panel slides"""

    blank_layout = prs.slide_layouts[0]
    slide_width = prs.slide_width
    slide_height = prs.slide_height

    # ============================================
    # SLIDE: DJ Live Display (TV Screen)
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
    p.text = "DJ Live Display — Big Screen at Venue"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Now Playing, Up Next, QR code for guests to scan and request songs"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Live display screenshot (full width)
    display_path = os.path.join(SCREENSHOTS_DIR, 'dj-live-display.png')
    if os.path.exists(display_path):
        slide.shapes.add_picture(display_path, Inches(0.5), Inches(1.3), width=Inches(12.3))

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  DJ Live Display"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: DJ Live Display slide")

    # ============================================
    # SLIDE: Sponsor Activation Panel
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
    p.text = "Sponsor Activation — Metagave Tequila"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Track sponsor ROI: attributed drinks, VIP redemptions, guest database delivered"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Sponsor panel screenshot
    sponsor_path = os.path.join(SCREENSHOTS_DIR, 'venue-06-sponsor-panel.png')
    if os.path.exists(sponsor_path):
        slide.shapes.add_picture(sponsor_path, Inches(0.5), Inches(1.3), width=Inches(8))

    # Key metrics
    metrics_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(9), Inches(1.3), Inches(3.8), Inches(5)
    )
    metrics_box.fill.solid()
    metrics_box.fill.fore_color.rgb = RgbColor(15, 25, 35)
    metrics_box.line.color.rgb = ELECTRIC_BLUE

    text_box = slide.shapes.add_textbox(Inches(9.2), Inches(1.5), Inches(3.4), Inches(4.7))
    tf = text_box.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Metagave ROI"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ELECTRIC_BLUE

    metrics = [
        ("$2,394", "Attributed Drink Sales"),
        ("171", "Margaritas Sold"),
        ("57", "Free Shots Redeemed"),
        ("247", "Opted-in Guest Database"),
    ]

    for value, label in metrics:
        p = tf.add_paragraph()
        p.text = value
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = RgbColor(255, 255, 255)
        p.space_before = Pt(16)

        p = tf.add_paragraph()
        p.text = label
        p.font.size = Pt(12)
        p.font.color.rgb = RgbColor(150, 150, 150)

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  Sponsor Activation Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: Sponsor Activation slide")

    # ============================================
    # SLIDE: SMS Marketing / Promo
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
    p.text = "SMS Marketing — Re-engage Your Guests"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RgbColor(255, 255, 255)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.85), Inches(12), Inches(0.4))
    tf = sub_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Send targeted SMS blasts to guests who opted in at previous events"
    p.font.size = Pt(16)
    p.font.color.rgb = RgbColor(150, 150, 150)

    # Marketing screenshot
    marketing_path = os.path.join(SCREENSHOTS_DIR, 'venue-10-promo-marketing.png')
    if os.path.exists(marketing_path):
        slide.shapes.add_picture(marketing_path, Inches(0.5), Inches(1.3), width=Inches(9))

    # SMS preview
    sms_path = os.path.join(SCREENSHOTS_DIR, 'flow-11-sms.png')
    if os.path.exists(sms_path):
        slide.shapes.add_picture(sms_path, Inches(10), Inches(1.3), width=Inches(2.5))

        label = slide.shapes.add_textbox(Inches(10), Inches(6.3), Inches(2.5), Inches(0.3))
        tf = label.text_frame
        p = tf.paragraphs[0]
        p.text = "Guest Receives"
        p.font.size = Pt(11)
        p.font.color.rgb = RgbColor(150, 150, 150)
        p.alignment = PP_ALIGN.CENTER

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.9), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  SMS Marketing Demo"
    p.font.size = Pt(10)
    p.font.color.rgb = RgbColor(100, 100, 100)

    print("  ✅ Added: SMS Marketing slide")

    return prs


def main():
    print("\n📸 Adding more demo slides...\n")

    prs = Presentation(PPTX_PATH)
    print(f"   Current slides: {len(prs.slides)}")

    prs = add_more_slides(prs)

    prs.save(PPTX_PATH)
    print(f"\n✅ Done! Presentation now has {len(prs.slides)} slides\n")


if __name__ == "__main__":
    main()
