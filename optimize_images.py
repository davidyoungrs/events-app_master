import os
from PIL import Image

public_dir = '/Users/davidyoung/Event App - Master/event-app_master/public'
extensions = ('.png', '.jpg', '.jpeg')

def optimize():
    for filename in os.listdir(public_dir):
        if filename.lower().endswith(extensions):
            file_path = os.path.join(public_dir, filename)
            try:
                with Image.open(file_path) as img:
                    # Remove alpha channel for JPEG/JPG if necessary, though WebP handles it
                    # but good for consistency
                    wb_path = os.path.splitext(file_path)[0] + '.webp'
                    img.save(wb_path, 'webp', quality=85)
                    print(f"Converted {filename} to {os.path.basename(wb_path)}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    optimize()
