import cv2
import numpy as np

img = cv2.imread('d:/Github/editorial-bloom/public/images/little-snap-logo.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]

# Histogram of alpha
hist, bins = np.histogram(alpha, bins=10, range=(1, 255))
print("Alpha histogram (1-255):", hist)

# If we just threshold alpha:
# keep only alpha > 200? Or keep alpha if it's close to the core logo.
