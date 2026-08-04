"""Download every card image used by the post lists, trim the solid-white band
baked into the top/bottom of the artwork, and write the trimmed files out.

Usage: python3 trim_cards.py [origin]   (default origin: http://localhost:3000)
Outputs: originals/<bucket>/…  trimmed/<bucket>/…  manifest.json
"""

import json
import os
import re
import sys
import urllib.parse
import urllib.request

from PIL import Image

ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
HERE = os.path.dirname(os.path.abspath(__file__))

# A row counts as blank when nearly every pixel is essentially white. The
# threshold is loose enough to absorb JPEG ringing along the artwork edge.
WHITE_MIN = 244
BLANK_ROW_RATIO = 0.995


def page_data(path):
    with urllib.request.urlopen(f"{ORIGIN}{path}", timeout=60) as r:
        html = r.read().decode("utf-8", "replace")
    blob = re.search(
        r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S
    )
    return json.loads(blob.group(1))["props"]["pageProps"]["blogs"]


def blank_rows(px, w, h, rows):
    """Count consecutive blank rows walking the given row order."""
    xs = range(0, w, 4)
    count = 0
    for y in rows:
        opaque = sum(1 for x in xs if min(px[x, y][:3]) >= WHITE_MIN)
        if opaque / len(xs) < BLANK_ROW_RATIO:
            break
        count += 1
    return count


def object_name(url):
    return urllib.parse.unquote(url.split("/o/", 1)[1].split("?", 1)[0])


def safe_url(url):
    """Stored URLs keep raw spaces and unicode in the object name."""
    parts = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((
        parts.scheme,
        parts.netloc,
        urllib.parse.quote(parts.path, safe="/%"),
        urllib.parse.quote(parts.query, safe="=&%"),
        parts.fragment,
    ))


def main():
    manifest = []
    for bucket, path in (("blog", "/blog"), ("trends", "/trends")):
        for post in page_data(path):
            for index, url in enumerate(post.get("images") or []):
                name = object_name(url)
                if os.path.splitext(name)[1].lower() not in (".jpg", ".jpeg", ".png"):
                    continue  # videos and other assets are left alone

                orig_dir = os.path.join(HERE, "originals", bucket)
                trim_dir = os.path.join(HERE, "trimmed", bucket)
                os.makedirs(orig_dir, exist_ok=True)
                os.makedirs(trim_dir, exist_ok=True)
                # Storage object names run past the 255-byte filename limit, so
                # the local copy keeps the tail; manifest.json holds the real name.
                base, ext = os.path.splitext(os.path.basename(name))
                safe = f"{post['id']}-{index}-{base[-80:]}{ext}"
                orig_path = os.path.join(orig_dir, safe)
                trim_path = os.path.join(trim_dir, safe)

                if not os.path.exists(orig_path):
                    urllib.request.urlretrieve(safe_url(url), orig_path)

                img = Image.open(orig_path)
                rgb = img.convert("RGB")
                w, h = rgb.size
                px = rgb.load()
                top = blank_rows(px, w, h, range(h))
                bottom = blank_rows(px, w, h, range(h - 1, top - 1, -1))

                entry = {
                    "bucket": bucket,
                    "postId": post["id"],
                    "title": (post.get("eng") or {}).get("title"),
                    "storageObject": name,
                    "url": url,
                    "size": [w, h],
                    "trimTop": top,
                    "trimBottom": bottom,
                    "local": os.path.relpath(trim_path, HERE),
                }

                if top or bottom:
                    cropped = img.crop((0, top, w, h - bottom))
                    if cropped.mode not in ("RGB", "L"):
                        cropped = cropped.convert("RGB")
                    cropped.save(trim_path, quality=92, subsampling=0, optimize=True)
                    entry["newSize"] = list(cropped.size)
                else:
                    entry["newSize"] = [w, h]

                manifest.append(entry)
                title = (entry["title"] or "")[:34]
                print(
                    f"{bucket:6} {title:34} {w}x{h}"
                    f"  top:{top:4}  bottom:{bottom:4}"
                    f"  -> {entry['newSize'][0]}x{entry['newSize'][1]}"
                    + ("" if (top or bottom) else "   (unchanged, not written)")
                )

    with open(os.path.join(HERE, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)
    trimmed = [m for m in manifest if m["trimTop"] or m["trimBottom"]]
    print(f"\n{len(trimmed)} of {len(manifest)} images had a white band; "
          f"trimmed copies in trimmed/, manifest.json maps each to its storage object.")


main()
