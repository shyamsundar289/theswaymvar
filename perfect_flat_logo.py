import cv2
import numpy as np

# Read original
img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787753107261.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

# Prepare new image
out_img = np.zeros((h, w, 4), dtype=np.uint8)

# Colors
color_top = np.array([56, 40, 56], dtype=np.uint8) # BGR
color_bottom = np.array([43, 63, 104], dtype=np.uint8) # BGR

# Create sharp mask from original alpha
alpha = img[:, :, 3]

# Core mask thresholded at 90 to ensure thin lines are kept
core_mask = (alpha > 90).astype(np.uint8) * 255

# Generate a clean, synthetic anti-aliased alpha
# Blur slightly to soften the jagged binary edge
clean_alpha = cv2.GaussianBlur(core_mask, (3, 3), 0)

# Fill top
out_img[:485, :, :3] = color_top
out_img[:485, :, 3] = clean_alpha[:485, :]

# Fill bottom
out_img[485:, :, :3] = color_bottom
out_img[485:, :, 3] = clean_alpha[485:, :]

# Save over the public asset
cv2.imwrite('d:/Github/editorial-bloom/public/images/little-snap-logo.png', out_img)
print("Saved perfect flat logo.")
