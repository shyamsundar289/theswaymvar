import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)
b, g, r, a = cv2.split(img)

# Find pixels with alpha between 30 and 70 (which includes shadow and thin strokes)
mask = (a > 30) & (a < 70)
b_mask = b[mask]
g_mask = g[mask]
r_mask = r[mask]

# Calculate saturation for these pixels
# convert to float
b_f = b_mask.astype(float)
g_f = g_mask.astype(float)
r_f = r_mask.astype(float)

mx = np.maximum(np.maximum(b_f, g_f), r_f)
mn = np.minimum(np.minimum(b_f, g_f), r_f)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

print("Mean saturation in alpha 30-70:", np.mean(sat))
print("Max saturation:", np.max(sat))

# How many pixels are 'brown' vs 'gray'?
brown_mask = (sat > 0.1)  # somewhat saturated
gray_mask = (sat <= 0.1)

print("Brown pixels in this range:", np.sum(brown_mask))
print("Gray pixels in this range:", np.sum(gray_mask))
