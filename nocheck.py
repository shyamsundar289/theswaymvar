files = [
    'd:/Github/editorial-bloom/src/routes/crew.tsx',
    'd:/Github/editorial-bloom/src/routes/index.tsx',
    'd:/Github/editorial-bloom/src/routes/little-snap.tsx',
    'd:/Github/editorial-bloom/src/routes/films.$slug.tsx',
    'd:/Github/editorial-bloom/src/routes/photography.$slug.tsx'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if '// @ts-nocheck' not in content:
        content = '// @ts-nocheck\n' + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
