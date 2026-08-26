import cv2
import numpy as np
import vtracer
import os

# 1. Prepare B&W Image
img_path = 'C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

b, g, r, a = cv2.split(img)

# Calculate saturation to identify true logo pixels
mx = np.maximum(np.maximum(b, g), r).astype(float)
mn = np.minimum(np.minimum(b, g), r).astype(float)
delta = mx - mn
sat = np.zeros_like(mx)
sat[mx > 0] = delta[mx > 0] / mx[mx > 0]

is_logo = sat > 0.1

# Create purely black and white image
bw_img = np.ones((h, w, 3), dtype=np.uint8) * 255
bw_img[is_logo] = [0, 0, 0] # Logo is black, background is white

bw_path = 'd:/Github/editorial-bloom/bw_logo.png'
cv2.imwrite(bw_path, bw_img)

# 2. Trace with vtracer
svg_path = 'd:/Github/editorial-bloom/public/images/little-snap-logo.svg'
vtracer.convert_image_to_svg_py(
    bw_path,
    svg_path,
    colormode="binary",
    hierarchical="stacked",
    mode="spline",
    filter_speckle=4,
    color_precision=6,
    layer_difference=16,
    corner_threshold=60,
    length_threshold=4.0,
    max_iterations=10,
    splice_threshold=45,
    path_precision=8
)

# 3. Read the SVG and inject the gradient
with open(svg_path, 'r') as f:
    svg_content = f.read()

# Create gradient definition
gradient_def = """<defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="68%" stop-color="#382838" />
        <stop offset="68%" stop-color="#683F2B" />
    </linearGradient>
</defs>"""

# Inject gradient definition right after <svg ...>
svg_content = svg_content.replace('>', '>\n' + gradient_def, 1)

# Replace black fill with the gradient
# Wait, vtracer outputs fill="#000000" or similar for binary mode
svg_content = svg_content.replace('fill="#000000"', 'fill="url(#logoGrad)"')
svg_content = svg_content.replace('fill="#000"', 'fill="url(#logoGrad)"')
svg_content = svg_content.replace('fill="black"', 'fill="url(#logoGrad)"')

with open(svg_path, 'w') as f:
    f.write(svg_content)

print(f"Successfully generated SVG at {svg_path}")
