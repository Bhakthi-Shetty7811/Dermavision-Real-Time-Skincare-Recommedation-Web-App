from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np

def apply(image):
    image = image.convert("RGB")

    # Step 1: Create a copy and apply gentle smoothing
    smoothed = image.filter(ImageFilter.GaussianBlur(radius=1.2))

    # Step 2: Brighten and boost contrast slightly for under-eye freshness
    bright = ImageEnhance.Brightness(smoothed).enhance(1.15)
    contrast = ImageEnhance.Contrast(bright).enhance(1.05)

    # Step 3: Create a mask for under-eye area
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    w, h = image.size

    # Under-eye zones (adjust size if needed)
    draw.ellipse((w*0.28, h*0.52, w*0.44, h*0.63), fill=160)  # Left under-eye
    draw.ellipse((w*0.56, h*0.52, w*0.72, h*0.63), fill=160)  # Right under-eye

    # Step 4: Blend enhanced areas only in the under-eye zones
    highlight = Image.composite(contrast, image, mask)

    # Step 5: Add a very soft highlight (optional hydration effect)
    final = ImageEnhance.Color(highlight).enhance(1.02)  # Slight color lift

    return final
