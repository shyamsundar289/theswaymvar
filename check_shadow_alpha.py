import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787753107261.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]

# Check max alpha of the shadow regions
# We know the shadow is wide. Let's look at pixels that are far from the core.
core = (alpha > 200).astype(np.uint8) * 255
dilated_core = cv2.dilate(core, np.ones((15, 15), np.uint8))
shadow_only = alpha.copy()
shadow_only[dilated_core == 255] = 0

print("Max alpha in shadow far from core:", np.max(shadow_only))
