import sys
import re

filepath = 'd:/Github/editorial-bloom/public/images/little-snap-logo.svg'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract defs
defs_start = content.find('<defs>')
defs_end = content.find('</defs>') + 7
defs_block = content[defs_start:defs_end]

# Remove defs from top
content = content[:defs_start] + content[defs_end:]

# Insert defs right after <svg ... >
svg_tag_start = content.find('<svg ')
svg_tag_end = content.find('>', svg_tag_start) + 1

content = content[:svg_tag_end] + '\n' + defs_block + content[svg_tag_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('SVG Fixed!')
