#!/usr/bin/env python3
"""
Rebuild demo slides with clean, readable layouts
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor
import os

PPTX_PATH = '/Users/moderndavinci/Desktop/lightning-pass-beach-club-pitch.pptx'
SCREENSHOTS = '/Users/moderndavinci/Desktop/Applications/Lightning-Project/Lightning-App/screenshots'
VIDEOS = f'{SCREENSHOTS}/videos'

# Colors
DARK_BG = RGBColor(10, 10, 15)
NEON_GREEN = RGBColor(57, 255, 20)
ELECTRIC_BLUE = RGBColor(0, 212, 255)
LIGHTNING_YELLOW = RGBColor(255, 221, 0)
WHITE = RGBColor(255, 255, 255)
GRAY = RGBColor(150, 150, 150)
DARK_GRAY = RGBColor(100, 100, 100)

def clear_slide(slide):
    """Remove all shapes from slide"""
    for shape in list(slide.shapes):
        sp = shape._element
        sp.getparent().remove(sp)

def add_background(slide, prs):
    """Add dark background"""
    bg = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, 0, 0,
        prs.slide_width, prs.slide_height
    )
    bg.fill.solid()
    bg.fill.fore_color.rgb = DARK_BG
    bg.line.fill.background()

def add_title(slide, title, subtitle=None):
    """Add title and optional subtitle"""
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.4), Inches(12), Inches(0.5))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = WHITE

    if subtitle:
        sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.9), Inches(12), Inches(0.3))
        tf = sub_box.text_frame
        p = tf.paragraphs[0]
        p.text = subtitle
        p.font.size = Pt(14)
        p.font.color.rgb = GRAY

def add_footer(slide):
    """Add footer"""
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(7.0), Inches(5), Inches(0.3))
    tf = footer.text_frame
    p = tf.paragraphs[0]
    p.text = "LIGHTNING PASS  ·  Confidential"
    p.font.size = Pt(9)
    p.font.color.rgb = DARK_GRAY

def rebuild_slide_16(slide, prs):
    """Customer RSVP Flow - Clean layout"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "Customer RSVP Flow", "30-second journey from event page to confirmed VIP pass")

    # 3 phone screenshots side by side
    screens = [
        ('flow-01-landing.png', 'Landing Page'),
        ('flow-03-tier-vip-selected.png', 'VIP Selected'),
        ('flow-10-pass-qr.png', 'Confirmed Pass'),
    ]

    x_start = 0.5
    for i, (img, label) in enumerate(screens):
        x = x_start + i * 2.8
        img_path = os.path.join(SCREENSHOTS, img)
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(x), Inches(1.4), width=Inches(2.4))

            lbl = slide.shapes.add_textbox(Inches(x), Inches(6.4), Inches(2.4), Inches(0.3))
            tf = lbl.text_frame
            p = tf.paragraphs[0]
            p.text = label
            p.font.size = Pt(11)
            p.font.color.rgb = GRAY
            p.alignment = PP_ALIGN.CENTER

    # Video on the right
    video_path = os.path.join(VIDEOS, 'customer-flow.mp4')
    if os.path.exists(video_path):
        slide.shapes.add_movie(video_path, Inches(9.2), Inches(1.4), Inches(3.5), Inches(5), mime_type='video/mp4')

        lbl = slide.shapes.add_textbox(Inches(9.2), Inches(6.4), Inches(3.5), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "▶ Full Flow Video"
        p.font.size = Pt(11)
        p.font.color.rgb = NEON_GREEN
        p.alignment = PP_ALIGN.CENTER

    add_footer(slide)

def rebuild_slide_17(slide, prs):
    """DJ Song Request System"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "DJ Song Request System", "Guests pay $3–$25 to request songs. DJ manages queue. Venue keeps 80%.")

    # Guest request screen (mobile)
    guest_path = os.path.join(SCREENSHOTS, 'dj-song-request-guest.png')
    if os.path.exists(guest_path):
        slide.shapes.add_picture(guest_path, Inches(0.5), Inches(1.4), width=Inches(2.2))

        lbl = slide.shapes.add_textbox(Inches(0.5), Inches(6.2), Inches(2.2), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Guest View"
        p.font.size = Pt(10)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    # DJ Dashboard
    dash_path = os.path.join(SCREENSHOTS, 'dj-dashboard.png')
    if os.path.exists(dash_path):
        slide.shapes.add_picture(dash_path, Inches(3), Inches(1.4), width=Inches(6))

        lbl = slide.shapes.add_textbox(Inches(3), Inches(5.2), Inches(6), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "DJ Dashboard — Queue & Tips"
        p.font.size = Pt(10)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    # Stats box
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.5), Inches(1.4), Inches(3.3), Inches(1.2))
    box.fill.solid()
    box.fill.fore_color.rgb = RGBColor(20, 30, 20)
    box.line.color.rgb = NEON_GREEN

    txt = slide.shapes.add_textbox(Inches(9.6), Inches(1.5), Inches(3.1), Inches(1))
    tf = txt.text_frame
    p = tf.paragraphs[0]
    p.text = "Tonight's Tips"
    p.font.size = Pt(11)
    p.font.color.rgb = GRAY
    p = tf.add_paragraph()
    p.text = "$185"
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = NEON_GREEN

    # Video
    video_path = os.path.join(VIDEOS, 'dj-experience.mp4')
    if os.path.exists(video_path):
        slide.shapes.add_movie(video_path, Inches(9.5), Inches(3), Inches(3.3), Inches(1.9), mime_type='video/mp4')

        lbl = slide.shapes.add_textbox(Inches(9.5), Inches(4.9), Inches(3.3), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "▶ DJ Experience"
        p.font.size = Pt(10)
        p.font.color.rgb = NEON_GREEN
        p.alignment = PP_ALIGN.CENTER

    add_footer(slide)

def rebuild_slide_18(slide, prs):
    """Venue Admin Dashboard"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "Venue Admin Dashboard", "Real-time RSVPs, revenue tracking, attendee lists, sponsor attribution")

    # Main dashboard screenshot
    overview_path = os.path.join(SCREENSHOTS, 'venue-01-overview.png')
    if os.path.exists(overview_path):
        slide.shapes.add_picture(overview_path, Inches(0.5), Inches(1.4), width=Inches(6))

    # Revenue breakdown
    revenue_path = os.path.join(SCREENSHOTS, 'venue-04-revenue-breakdown.png')
    if os.path.exists(revenue_path):
        slide.shapes.add_picture(revenue_path, Inches(6.8), Inches(1.4), width=Inches(6))

    # Key metrics row
    metrics = [
        ("247", "RSVPs", NEON_GREEN),
        ("$570", "Ticket Revenue", LIGHTNING_YELLOW),
        ("$2,394", "Sponsor ROI", ELECTRIC_BLUE),
    ]

    for i, (val, label, color) in enumerate(metrics):
        x = 0.5 + i * 4.2
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(5.5), Inches(3.8), Inches(0.9))
        box.fill.solid()
        box.fill.fore_color.rgb = RGBColor(20, 20, 25)
        box.line.color.rgb = color

        txt = slide.shapes.add_textbox(Inches(x + 0.15), Inches(5.55), Inches(3.5), Inches(0.8))
        tf = txt.text_frame
        p = tf.paragraphs[0]
        p.text = f"{val}  {label}"
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = color

    add_footer(slide)

def rebuild_slide_19(slide, prs):
    """White-Label Comparison"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "Model B: White-Label Branding", "Same platform — your brand, your domain, your colors")

    # Lightning Pass branded
    lp_path = os.path.join(SCREENSHOTS, 'brand-lightning.png')
    if os.path.exists(lp_path):
        slide.shapes.add_picture(lp_path, Inches(1), Inches(1.4), width=Inches(2.6))

        lbl = slide.shapes.add_textbox(Inches(1), Inches(6.2), Inches(2.6), Inches(0.5))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Model A"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = NEON_GREEN
        p.alignment = PP_ALIGN.CENTER
        p = tf.add_paragraph()
        p.text = "Lightning Pass"
        p.font.size = Pt(11)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    # Arrow
    arrow = slide.shapes.add_textbox(Inches(4.2), Inches(3.5), Inches(0.8), Inches(0.5))
    tf = arrow.text_frame
    p = tf.paragraphs[0]
    p.text = "→"
    p.font.size = Pt(36)
    p.font.color.rgb = LIGHTNING_YELLOW

    # Beach Club branded
    bc_path = os.path.join(SCREENSHOTS, 'brand-beach-club.png')
    if os.path.exists(bc_path):
        slide.shapes.add_picture(bc_path, Inches(5.5), Inches(1.4), width=Inches(2.6))

        lbl = slide.shapes.add_textbox(Inches(5.5), Inches(6.2), Inches(2.6), Inches(0.5))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Model B"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = LIGHTNING_YELLOW
        p.alignment = PP_ALIGN.CENTER
        p = tf.add_paragraph()
        p.text = "Beach Club Pass"
        p.font.size = Pt(11)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    # Benefits panel
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.8), Inches(1.4), Inches(4), Inches(3.5))
    box.fill.solid()
    box.fill.fore_color.rgb = RGBColor(20, 25, 35)
    box.line.color.rgb = RGBColor(212, 168, 83)

    txt = slide.shapes.add_textbox(Inches(9), Inches(1.6), Inches(3.6), Inches(3.2))
    tf = txt.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Model B Includes:"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = RGBColor(212, 168, 83)

    benefits = ["Your logo & colors", "Custom domain", "90/10 revenue split", "$5K + $500/mo"]
    for b in benefits:
        p = tf.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(12)
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)

    # Video
    video_path = os.path.join(VIDEOS, 'white-label-demo.mp4')
    if os.path.exists(video_path):
        slide.shapes.add_movie(video_path, Inches(8.8), Inches(5.2), Inches(4), Inches(1.5), mime_type='video/mp4')

    add_footer(slide)

def rebuild_slide_20(slide, prs):
    """Door Scanner"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "Door Scanner & Entry", "Bouncer scans QR → instant verification → guest sees welcome screen")

    # Scanner screenshot
    scanner_path = os.path.join(SCREENSHOTS, 'venue-08-scanner.png')
    if os.path.exists(scanner_path):
        slide.shapes.add_picture(scanner_path, Inches(0.5), Inches(1.4), width=Inches(7))

        lbl = slide.shapes.add_textbox(Inches(0.5), Inches(5.8), Inches(7), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Bouncer View — VIP Entry Accepted"
        p.font.size = Pt(11)
        p.font.color.rgb = GRAY

    # Guest welcome screen
    redirect_path = os.path.join(SCREENSHOTS, 'flow-12-qr-redirect.png')
    if os.path.exists(redirect_path):
        slide.shapes.add_picture(redirect_path, Inches(8), Inches(1.4), width=Inches(2.3))

        lbl = slide.shapes.add_textbox(Inches(8), Inches(6.2), Inches(2.3), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Guest Welcome"
        p.font.size = Pt(11)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    # Video
    video_path = os.path.join(VIDEOS, 'bouncer-scan.mp4')
    if os.path.exists(video_path):
        slide.shapes.add_movie(video_path, Inches(10.5), Inches(1.4), Inches(2.3), Inches(1.3), mime_type='video/mp4')

        lbl = slide.shapes.add_textbox(Inches(10.5), Inches(2.7), Inches(2.3), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "▶ Scan Demo"
        p.font.size = Pt(10)
        p.font.color.rgb = NEON_GREEN
        p.alignment = PP_ALIGN.CENTER

    add_footer(slide)

def rebuild_slide_21(slide, prs):
    """DJ Live Display"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "DJ Live Display", "Big screen at venue — Now Playing, Up Next, QR code for song requests")

    # Full-width display screenshot
    display_path = os.path.join(SCREENSHOTS, 'dj-live-display.png')
    if os.path.exists(display_path):
        slide.shapes.add_picture(display_path, Inches(0.5), Inches(1.3), width=Inches(12.3))

    add_footer(slide)

def rebuild_slide_22(slide, prs):
    """Sponsor Activation"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "Sponsor Activation — Metagave Tequila", "Track ROI: attributed drinks, VIP redemptions, opt-in database")

    # Sponsor panel screenshot
    sponsor_path = os.path.join(SCREENSHOTS, 'venue-06-sponsor-panel.png')
    if os.path.exists(sponsor_path):
        slide.shapes.add_picture(sponsor_path, Inches(0.5), Inches(1.3), width=Inches(8))

    # Metrics panel
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9), Inches(1.3), Inches(3.8), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = RGBColor(15, 25, 35)
    box.line.color.rgb = ELECTRIC_BLUE

    txt = slide.shapes.add_textbox(Inches(9.2), Inches(1.5), Inches(3.4), Inches(4.5))
    tf = txt.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Metagave ROI"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ELECTRIC_BLUE

    metrics = [
        ("$2,394", "Attributed Sales"),
        ("171", "Margaritas Sold"),
        ("57", "Free Shots"),
        ("247", "Opt-in Database"),
    ]

    for val, label in metrics:
        p = tf.add_paragraph()
        p.text = val
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(12)

        p = tf.add_paragraph()
        p.text = label
        p.font.size = Pt(11)
        p.font.color.rgb = GRAY

    add_footer(slide)

def rebuild_slide_23(slide, prs):
    """SMS Marketing"""
    clear_slide(slide)
    add_background(slide, prs)
    add_title(slide, "SMS Marketing", "Re-engage guests with targeted blasts to opted-in database")

    # Marketing screenshot
    marketing_path = os.path.join(SCREENSHOTS, 'venue-10-promo-marketing.png')
    if os.path.exists(marketing_path):
        slide.shapes.add_picture(marketing_path, Inches(0.5), Inches(1.3), width=Inches(9))

    # SMS preview
    sms_path = os.path.join(SCREENSHOTS, 'flow-11-sms.png')
    if os.path.exists(sms_path):
        slide.shapes.add_picture(sms_path, Inches(10), Inches(1.3), width=Inches(2.5))

        lbl = slide.shapes.add_textbox(Inches(10), Inches(6.2), Inches(2.5), Inches(0.3))
        tf = lbl.text_frame
        p = tf.paragraphs[0]
        p.text = "Guest Receives"
        p.font.size = Pt(10)
        p.font.color.rgb = GRAY
        p.alignment = PP_ALIGN.CENTER

    add_footer(slide)


def main():
    print("\n🧹 Rebuilding demo slides with clean layouts...\n")

    prs = Presentation(PPTX_PATH)
    print(f"   Loaded {len(prs.slides)} slides")

    # Rebuild slides 16-23 (indices 15-22)
    rebuild_slide_16(prs.slides[15], prs)
    print("   ✅ Slide 16: Customer RSVP Flow")

    rebuild_slide_17(prs.slides[16], prs)
    print("   ✅ Slide 17: DJ Song Request System")

    rebuild_slide_18(prs.slides[17], prs)
    print("   ✅ Slide 18: Venue Admin Dashboard")

    rebuild_slide_19(prs.slides[18], prs)
    print("   ✅ Slide 19: White-Label Comparison")

    rebuild_slide_20(prs.slides[19], prs)
    print("   ✅ Slide 20: Door Scanner")

    rebuild_slide_21(prs.slides[20], prs)
    print("   ✅ Slide 21: DJ Live Display")

    rebuild_slide_22(prs.slides[21], prs)
    print("   ✅ Slide 22: Sponsor Activation")

    rebuild_slide_23(prs.slides[22], prs)
    print("   ✅ Slide 23: SMS Marketing")

    prs.save(PPTX_PATH)
    print(f"\n💾 Saved clean presentation")

    import os
    size = os.path.getsize(PPTX_PATH) / 1024 / 1024
    print(f"   File: {PPTX_PATH}")
    print(f"   Size: {size:.1f} MB\n")


if __name__ == "__main__":
    main()
