import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)
b, g, r, a = cv2.split(img)

mx = np.maximum(np.maximum(b, g), r).astype(float)
mn = np.minimum(np.minimum(b, g), r).astype(float)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

colored_pixels = sat > 0.15

print("Colored pixels with alpha < 90:", np.sum(colored_pixels & (a < 90)))
print("Colored pixels with alpha < 50:", np.sum(colored_pixels & (a < 50)))
print("Colored pixels with alpha > 0:", np.sum(colored_pixels & (a > 0)))
