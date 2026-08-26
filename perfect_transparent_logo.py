import cv2
import numpy as np

# Read original
img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

b, g, r, a = cv2.split(img)

# Calculate saturation
mx = np.maximum(np.maximum(b, g), r).astype(float)
mn = np.minimum(np.minimum(b, g), r).astype(float)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

# Identify true logo pixels (colored pixels)
# sat > 0.1 perfectly separates the colored logo from the gray/black shadow
is_logo = sat > 0.1

# Extract the alpha for the true logo
clean_alpha = np.where(is_logo, a, 0).astype(float) / 255.0

# Prepare solid colors
color_top = np.array([56, 40, 56], dtype=float) # BGR
color_bottom = np.array([43, 63, 104], dtype=float) # BGR

# Create the solid color foreground
fg_color = np.zeros((h, w, 3), dtype=float)
fg_color[:485, :] = color_top
fg_color[485:, :] = color_bottom

# Instead of compositing over white, save as a transparent PNG!
# This prevents iOS/mobile color profile mismatches from showing a white box.
final_img = np.zeros((h, w, 4), dtype=np.uint8)
final_img[:, :, :3] = fg_color.astype(np.uint8)
final_img[:, :, 3] = (clean_alpha * 255).astype(np.uint8)

# Save over the public asset
cv2.imwrite('d:/Github/editorial-bloom/public/images/little-snap-logo.png', final_img)
print("Saved perfect transparent background logo.")
