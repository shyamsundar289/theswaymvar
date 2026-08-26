import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)
b, g, r, a = cv2.split(img)

mx = np.maximum(np.maximum(b, g), r).astype(float)
mn = np.minimum(np.minimum(b, g), r).astype(float)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

# Core text mask
core = (a > 200).astype(np.uint8) * 255
# Dilate by 3 pixels to include true anti-aliasing
kernel = np.ones((7, 7), np.uint8)
dilated_core = cv2.dilate(core, kernel)

# Find colored pixels OUTSIDE the dilated core
far_colored = (sat > 0.1) & (a > 0) & (dilated_core == 0)

print("Colored pixels far from core:", np.sum(far_colored))
