#!/usr/bin/env python3
"""
Reorder slides to put demo content after 'What Lightning Pass Does'
"""

from pptx import Presentation
import copy

PPTX_PATH = '/Users/moderndavinci/Desktop/lightning-pass-beach-club-pitch.pptx'

def move_slide(prs, old_index, new_index):
    """Move slide from old_index to new_index"""
    xml_slides = prs.slides._sldIdLst
    slides = list(xml_slides)
    xml_slides.remove(slides[old_index])
    xml_slides.insert(new_index, slides[old_index])

def main():
    print("\n📋 Reordering slides...\n")

    prs = Presentation(PPTX_PATH)

    # Current order (0-indexed):
    # 0-14: Original slides (1-15)
    # 15: Customer RSVP Flow
    # 16: DJ Song Request System
    # 17: Venue Admin Dashboard
    # 18: Model B: White-Label Branding
    # 19: Door Scanner
    # 20: DJ Live Display
    # 21: Sponsor Activation
    # 22: SMS Marketing

    # Target order: Move demo slides after slide 3 (index 2, "What Lightning Pass Does")
    # So they become slides 4-11, pushing everything else down

    # We need to move slides 15-22 to positions 3-10
    # Move one at a time from the end

    # Move slide 15 (Customer RSVP Flow) to position 3 (after "What Lightning Pass Does")
    # After this, old slide 16 becomes the new 15, etc.

    moves = [
        (15, 3),   # Customer RSVP Flow -> after "What Lightning Pass Does"
        (16, 4),   # DJ Song Request System
        (17, 5),   # Venue Admin Dashboard
        (18, 6),   # DJ Live Display (was 20, now 18 after moves)
        (19, 7),   # Sponsor Activation
        (20, 8),   # SMS Marketing
        (21, 9),   # Model B White-Label (was 18)
        (22, 10),  # Door Scanner (was 19)
    ]

    for old_idx, new_idx in moves:
        move_slide(prs, old_idx, new_idx)
        print(f"  Moved slide {old_idx + 1} to position {new_idx + 1}")

    prs.save(PPTX_PATH)
    print(f"\n✅ Slides reordered!\n")

    # Verify
    prs2 = Presentation(PPTX_PATH)
    print("New order:")
    for i, slide in enumerate(prs2.slides, 1):
        for shape in slide.shapes:
            if shape.has_text_frame:
                text = shape.text_frame.text.strip()
                if text and len(text) < 50:
                    print(f"  {i:2d}. {text}")
                    break


if __name__ == "__main__":
    main()
