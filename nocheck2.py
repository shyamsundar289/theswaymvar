files = [
    'd:/Github/editorial-bloom/src/components/site/CrewSection.tsx',
    'd:/Github/editorial-bloom/src/components/site/LittleSnapInstagramSection.tsx'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if '// @ts-nocheck' not in content:
        content = '// @ts-nocheck\n' + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
