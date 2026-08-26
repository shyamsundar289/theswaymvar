import os
import re

files_to_fix = [
    "src/routes/about.tsx",
    "src/routes/crew.tsx",
    "src/routes/film.tsx",
    "src/routes/photography.index.tsx",
    "src/routes/services.tsx",
    "src/routes/videography.tsx"
]

for file_path in files_to_fix:
    full_path = os.path.join("d:/Github/editorial-bloom", file_path)
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace `import { getSeoMetadata } from "@/config/seo";` 
    # with `import { getSeoMetadata, SITE_URL } from "@/config/seo";`
    new_content = re.sub(r'import\s+{\s*getSeoMetadata\s*}\s+from\s+["\']@/config/seo["\'];', 'import { getSeoMetadata, SITE_URL } from "@/config/seo";', content)
    
    # Maybe some files have BUSINESS_INFO?
    new_content = re.sub(r'import\s+{\s*getSeoMetadata,\s*BUSINESS_INFO\s*}\s+from\s+["\']@/config/seo["\'];', 'import { getSeoMetadata, BUSINESS_INFO, SITE_URL } from "@/config/seo";', new_content)

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

print("Fixed SITE_URL imports!")
