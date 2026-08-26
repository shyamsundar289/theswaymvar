filepath = 'd:/Github/editorial-bloom/src/routes/crew.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('// @ts-ignoreif', '// @ts-ignore\n  if')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
