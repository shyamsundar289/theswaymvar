import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)
b, g, r, a = cv2.split(img)

# compute saturation
mx = np.maximum(np.maximum(b, g), r).astype(float)
mn = np.minimum(np.minimum(b, g), r).astype(float)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

# Let's see the histogram of saturation for pixels with alpha > 10
valid = a > 10
sat_valid = sat[valid]

hist, bins = np.histogram(sat_valid, bins=10, range=(0, 1))
print("Saturation histogram:", hist)

# Let's save a preview of the mask where sat > 0.15 and alpha > 10
mask = ((sat > 0.15) & (a > 10)).astype(np.uint8) * 255
cv2.imwrite('d:/Github/editorial-bloom/public/images/test_mask.png', mask)
print("Saved test_mask.png")
