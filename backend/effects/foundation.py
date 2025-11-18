from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def apply(image):
    image = image.convert("RGB")

    # Step 1: Apply soft blur but preserve edges
    base_blur = image.filter(ImageFilter.GaussianBlur(radius=1.5))

    # Step 2: Simulate warm foundation tone (soft golden touch)
    r, g, b = base_blur.split()
    r = r.point(lambda i: min(i * 1.07, 255))  # boost red
    g = g.point(lambda i: min(i * 1.03, 255))  # tiny green shift
    warm_image = Image.merge("RGB", (r, g, b))

    # Step 3: Apply a gentle matte effect by reducing highlights slightly
    np_img = np.array(warm_image).astype(np.uint8)
    matte_img = np.clip(np_img * 0.97 + 5, 0, 255).astype(np.uint8)  # soft glow, reduced shine
    matte_image = Image.fromarray(matte_img)

    # Step 4: Lift face with subtle brightness + contrast
    enhanced = ImageEnhance.Brightness(matte_image).enhance(1.06)
    enhanced = ImageEnhance.Contrast(enhanced).enhance(1.08)

    # Step 5: Final light sharpening to retain texture
    final = enhanced.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=3))

    return final
