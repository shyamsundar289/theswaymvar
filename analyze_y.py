import cv2
import numpy as np

img = cv2.imread('d:/Github/editorial-bloom/public/images/little-snap-logo.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]
core_mask = (alpha > 200).astype(np.uint8) * 255

# Find where the font is vs the main logo
# The main logo is likely the top part, the font is the bottom part.
# Let's find the y-coordinates of the core_mask
coords = cv2.findNonZero(core_mask)
if coords is not None:
    y_coords = coords[:, 0, 1]
    y_min, y_max = np.min(y_coords), np.max(y_coords)
    print("Core y-coords span from", y_min, "to", y_max)
    # Print the row sums of core_mask to see the gap between logo and font
    row_sums = np.sum(core_mask, axis=1) // 255
    print("Row profile (y, count):")
    for y in range(y_min, y_max, 20):
        print(f"y={y}: {np.sum(row_sums[y:y+20])}")

