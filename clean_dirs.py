import os

for root, dirs, files in os.walk('public', topdown=False):
    for name in dirs:
        try:
            os.rmdir(os.path.join(root, name))
        except OSError:
            pass
