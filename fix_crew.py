import re

filepath = 'd:/Github/editorial-bloom/src/routes/crew.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('layout: string;', 'layout: "editorial-split" | "cinema-center" | "offset-minimal" | "landscape-overlap" | "vertical-hero";')
content = content.replace('const imageVariants: Record<string, Variants> = {', 'const imageVariants: Record<CrewMember["layout"], Variants> = {')

# The ease property is too strict in framer motion
content = content.replace('const transitionEase = [0.76, 0, 0.24, 1];', 'const transitionEase = [0.76, 0, 0.24, 1] as any;')

content = re.sub(r'variants=\{imageVariants\[layout\]\}', r'variants={imageVariants[layout as keyof typeof imageVariants]!}', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
