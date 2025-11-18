from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np

def apply(image):
    image = image.convert("RGB")
    
    # 1. Apply a stronger Gaussian blur for deeper texture refinement
    deep_blur = image.filter(ImageFilter.GaussianBlur(radius=2.5))

    # 2. Enhance brightness moderately for glow
    bright = ImageEnhance.Brightness(deep_blur).enhance(1.15)

    # 3. Slight color pop to simulate healthy skin tone (like post-facial radiance)
    color_boost = ImageEnhance.Color(bright).enhance(1.08)

    # 4. Sharpen lightly to preserve details while enhancing clarity
    refined = color_boost.filter(ImageFilter.UnsharpMask(radius=1.2, percent=100, threshold=3))

    # 5. Final pass: soft light overlay to simulate glow
    final = ImageEnhance.Contrast(refined).enhance(1.03)
    final = ImageEnhance.Brightness(final).enhance(1.05)

    return final
