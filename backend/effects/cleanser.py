from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def apply(image):
    image = image.convert("RGB")

    # 1. Apply mild Gaussian blur to simulate open pores & clean surface
    blurred = image.filter(ImageFilter.GaussianBlur(radius=1.2))

    # 2. Slight desaturation to reduce oiliness glow (less yellow/red)
    color = ImageEnhance.Color(blurred).enhance(0.9)

    # 3. Apply a brightness + slight contrast for that “fresh” tone
    bright = ImageEnhance.Brightness(color).enhance(1.1)
    contrast = ImageEnhance.Contrast(bright).enhance(1.05)

    # 4. Sharpen slightly to give a clean & tight skin feeling
    clean = contrast.filter(ImageFilter.UnsharpMask(radius=1, percent=120, threshold=2))

    # 5. Optional: tone curve simulation for polished finish (cooler tone)
    np_img = np.array(clean).astype(np.float32)
    np_img[..., 0] *= 0.98  # reduce red channel slightly
    np_img[..., 2] *= 1.03  # boost blue channel for freshness
    np_img = np.clip(np_img, 0, 255).astype(np.uint8)
    final = Image.fromarray(np_img)

    return final
