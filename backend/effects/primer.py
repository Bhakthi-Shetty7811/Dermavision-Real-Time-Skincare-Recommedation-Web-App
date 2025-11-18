from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np

def apply(image):
    image = image.convert("RGB")

    # 1. Apply a soft Gaussian blur for texture smoothing
    blurred = image.filter(ImageFilter.GaussianBlur(radius=2))

    # 2. Create a mask to apply blur selectively (avoid over-blurring eyes/lips)
    mask = Image.new("L", image.size, 128)
    draw = ImageDraw.Draw(mask)
    w, h = image.size

    # Simulate high-detail areas (eyes, lips) to stay sharper
    draw.ellipse((w*0.3, h*0.4, w*0.7, h*0.75), fill=100)  # Central face blur
    draw.ellipse((w*0.4, h*0.45, w*0.6, h*0.55), fill=60)   # Nose and cheeks more smoothed

    # Blend blurred and original with mask
    smoothed = Image.composite(blurred, image, mask)

    # 3. Boost brightness for healthy glow
    bright = ImageEnhance.Brightness(smoothed).enhance(1.12)

    # 4. Slight contrast and color boost to simulate that "prepped skin"
    contrast = ImageEnhance.Contrast(bright).enhance(1.07)
    color = ImageEnhance.Color(contrast).enhance(1.05)

    # 5. Optional light sharpening to maintain natural texture
    final = color.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=3))

    return final



