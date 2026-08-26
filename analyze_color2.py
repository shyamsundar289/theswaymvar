import cv2
import numpy as np

img = cv2.imread('C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png', cv2.IMREAD_UNCHANGED)

# Print shape to see if it has alpha channel
print("Shape:", img.shape)

if img.shape[2] == 4:
    # If it has an alpha channel, we can composite it over white first to see what it looks like
    b, g, r, a = cv2.split(img)
    alpha = a.astype(float) / 255.0
    bg = np.ones_like(b, dtype=float) * 255
    b_out = b * alpha + bg * (1 - alpha)
    g_out = g * alpha + bg * (1 - alpha)
    r_out = r * alpha + bg * (1 - alpha)
    img_rgb = cv2.merge([b_out, g_out, r_out]).astype(np.uint8)
else:
    img_rgb = img

# Let's save the flattened image to look at it? No I can't look at it, but I can process it.
hsv = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2HSV)
h, s, v = cv2.split(hsv)

# Print stats
print("Median Saturation of all pixels:", np.median(s))
print("Mean Saturation:", np.mean(s))
