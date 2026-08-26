import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787753107261.png', cv2.IMREAD_UNCHANGED)

# y > 485 is the text
text_region = img[485:, :, :]
alpha = text_region[:, :, 3]
core_text = text_region[alpha > 200]

median_color = np.median(core_text[:, :3], axis=0)
mean_color = np.mean(core_text[:, :3], axis=0)

print("Text region core median BGR:", median_color)
print("Text region core mean BGR:", mean_color)

# Top logo (y <= 485)
logo_region = img[:485, :, :]
logo_alpha = logo_region[:, :, 3]
core_logo = logo_region[logo_alpha > 200]

median_logo = np.median(core_logo[:, :3], axis=0)
print("Top logo core median BGR:", median_logo)
