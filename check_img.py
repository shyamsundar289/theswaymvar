import cv2
import numpy as np

img = cv2.imread('d:/Github/editorial-bloom/public/images/little-snap-logo.png', cv2.IMREAD_UNCHANGED)
print('Shape:', img.shape)
if len(img.shape) == 3 and img.shape[2] == 4:
    alpha = img[:, :, 3]
    semi_transparent = np.sum((alpha > 0) & (alpha < 250))
    print('Semi-transparent pixels:', semi_transparent)
