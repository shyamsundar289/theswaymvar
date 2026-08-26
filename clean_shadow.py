import cv2
import numpy as np

img = cv2.imread('d:/Github/editorial-bloom/public/images/little-snap-logo.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]

# Create core mask of the solid strokes
core_mask = (alpha > 120).astype(np.uint8) * 255

# Split into top (main logo) and bottom (font)
# y=485 is the gap between the logo and "Little Snap"
top_mask = np.zeros_like(core_mask)
top_mask[:485, :] = core_mask[:485, :]

bottom_mask = np.zeros_like(core_mask)
bottom_mask[485:, :] = core_mask[485:, :]

# Top: aggressive shadow removal (dilate by just 1 pixel for anti-aliasing)
kernel_top = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
top_dilated = cv2.dilate(top_mask, kernel_top, iterations=1)

# Bottom: slightly less aggressive (dilate by 3 pixels to keep soft edges of font)
kernel_bottom = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
bottom_dilated = cv2.dilate(bottom_mask, kernel_bottom, iterations=1)

# Combine the allowed regions
allowed_region = cv2.bitwise_or(top_dilated, bottom_dilated)

# Smooth the allowed region slightly so the cutoff isn't completely harsh
allowed_region_smoothed = cv2.GaussianBlur(allowed_region, (3, 3), 0)

# Apply the mask to the original alpha
# Where the allowed region is 0, alpha becomes 0.
# Where allowed region is 255, alpha is preserved.
new_alpha = (alpha.astype(np.float32) * (allowed_region_smoothed.astype(np.float32) / 255.0)).astype(np.uint8)

# To further clean the top logo, we can suppress alpha values < 100 in the top part
# because the shadow might still be visible inside the 1-pixel dilation.
# Actually, the mask handles it well enough.

img[:, :, 3] = new_alpha

cv2.imwrite('d:/Github/editorial-bloom/public/images/little-snap-logo.png', img)
print("Image cleaned and saved.")
