import os
import re

def search_files(directory, ext='.tsx'):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(ext):
                yield os.path.join(root, file)

image_pattern = re.compile(r'<img[^>]*src=[\'\"\{]([^\'\">\}]+)[\'\"\}]')
video_pattern = re.compile(r'<video[^>]*>')
src_pattern = re.compile(r'src=[\'\"\{]([^\'\">\}]+)[\'\"\}]')
poster_pattern = re.compile(r'poster=[\'\"\{]([^\'\">\}]+)[\'\"\}]')

print("=== ROUTES ===")
for file in search_files('d:/Github/editorial-bloom/src/routes'):
    print(f'\n--- {os.path.basename(file)} ---')
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    imgs = image_pattern.findall(content)
    if imgs:
        print('Images:', imgs)
        
    vids = video_pattern.findall(content)
    for v in vids:
        src = src_pattern.findall(v)
        poster = poster_pattern.findall(v)
        print(f'Video: src={src}, poster={poster}')

print("\n=== COMPONENTS ===")
for file in search_files('d:/Github/editorial-bloom/src/components'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    imgs = image_pattern.findall(content)
    vids = video_pattern.findall(content)
    
    if imgs or vids:
        print(f'\n--- {os.path.basename(file)} ---')
        if imgs: print('Images:', imgs)
        for v in vids:
            src = src_pattern.findall(v)
            poster = poster_pattern.findall(v)
            print(f'Video: src={src}, poster={poster}')
