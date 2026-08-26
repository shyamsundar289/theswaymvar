import cv2

img_path = 'C:/Users/shyam/.gemini/antigravity/brain/e9313ad9-1061-4585-85db-c0dfdf846d5d/.user_uploaded/media_1787755163866.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

svg_path = 'd:/Github/editorial-bloom/public/images/little-snap-logo.svg'
with open(svg_path, 'r') as f:
    svg_content = f.read()

# Replace width and height with viewBox
import re
svg_content = re.sub(r'width="\d+" height="\d+"', f'viewBox="0 0 {w} {h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"', svg_content)

with open(svg_path, 'w') as f:
    f.write(svg_content)

print(f"Fixed viewBox to 0 0 {w} {h}")
