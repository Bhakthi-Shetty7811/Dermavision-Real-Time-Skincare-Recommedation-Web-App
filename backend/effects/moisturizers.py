from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np

def apply(image):
    image = image.convert("RGB")

    # 1. Soft Gaussian blur for plump smooth skin
    blurred = image.filter(ImageFilter.GaussianBlur(radius=1.5))

    # 2. Create a glow mask for highlight areas (cheeks + forehead)
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    w, h = image.size

    # Highlight forehead and cheeks for a hydrated glow
    draw.ellipse((w*0.35, h*0.25, w*0.65, h*0.40), fill=80)  # Forehead
    draw.ellipse((w*0.20, h*0.50, w*0.40, h*0.65), fill=100)  # Left cheek
    draw.ellipse((w*0.60, h*0.50, w*0.80, h*0.65), fill=100)  # Right cheek

    # Blend the blurred with original image
    softened = Image.composite(blurred, image, mask)

    # 3. Slight boost to brightness and color (radiance)
    bright = ImageEnhance.Brightness(softened).enhance(1.08)
    color = ImageEnhance.Color(bright).enhance(1.1)

    # 4. Add slight contrast for richness
    contrast = ImageEnhance.Contrast(color).enhance(1.05)

    # 5. Optional: Subtle sharpening for a natural finish
    final = contrast.filter(ImageFilter.UnsharpMask(radius=1, percent=70, threshold=3))

    return final
