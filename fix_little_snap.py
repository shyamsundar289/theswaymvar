import re

filepath = 'd:/Github/editorial-bloom/src/routes/little-snap.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace assets.home.editorial[x] with assets.home.editorial[x]!
content = re.sub(r'assets\.home\.editorial\[(\d+)\]\.mobile', r'assets.home.editorial[\1]!.mobile', content)
content = re.sub(r'assets\.home\.editorial\[(\d+)\]\.desktop', r'assets.home.editorial[\1]!.desktop', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
