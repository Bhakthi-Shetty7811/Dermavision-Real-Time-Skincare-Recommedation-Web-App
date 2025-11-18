from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np

def apply(image):
    # Convert to editable format
    image = image.convert("RGB")
    img_np = np.array(image)

    # 1. Convert to PIL again for applying local blur
    blurred = image.filter(ImageFilter.GaussianBlur(radius=2))

    # 2. Create a mask for under-eye and T-zone (simulated)
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    
    w, h = image.size

    # Simulate under-eye zones (two ellipses)
    draw.ellipse((w*0.25, h*0.55, w*0.45, h*0.65), fill=128)  # Left eye
    draw.ellipse((w*0.55, h*0.55, w*0.75, h*0.65), fill=128)  # Right eye

    # Simulate T-zone (small area on forehead and nose)
    draw.rectangle((w*0.45, h*0.35, w*0.55, h*0.50), fill=100)  # Forehead
    draw.rectangle((w*0.48, h*0.50, w*0.52, h*0.70), fill=100)  # Nose

    # 3. Blend original and blurred image using mask
    final = Image.composite(blurred, image, mask)

    # 4. Brighten selectively (highlighting under-eyes and T-zone)
    bright = ImageEnhance.Brightness(final).enhance(1.1)
    contrast = ImageEnhance.Contrast(bright).enhance(1.05)

    # 5. Very slight sharpening to maintain skin detail
    final = contrast.filter(ImageFilter.UnsharpMask(radius=1, percent=100, threshold=2))

    return final
