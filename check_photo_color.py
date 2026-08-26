import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787753107261.png', cv2.IMREAD_UNCHANGED)

photography_region = img[670:, :, :]
alpha = photography_region[:, :, 3]
core = photography_region[alpha > 200]
print("Photography median BGR:", np.median(core[:, :3], axis=0))
