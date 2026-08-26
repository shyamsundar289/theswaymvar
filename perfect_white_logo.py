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

# Create pure white background
bg_color = np.ones((h, w, 3), dtype=float) * 255.0

# Composite foreground over white background using the clean alpha
clean_alpha_3d = np.expand_dims(clean_alpha, axis=2)
final_img = fg_color * clean_alpha_3d + bg_color * (1.0 - clean_alpha_3d)
final_img = final_img.astype(np.uint8)

# Because the final image is on a white background, it does not need an alpha channel
cv2.imwrite('d:/Github/editorial-bloom/public/images/little-snap-logo.png', final_img)
print("Saved perfect white background logo.")
