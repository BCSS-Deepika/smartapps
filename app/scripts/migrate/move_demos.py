"""One-off Gate 5 migration, run once after `git mv demos/<x>.html app/public/demos/<x>/index.html`.

Each demo stays the self-contained app it was. Only these things change:
  * links to the homepage, product pages and fonts point at the new addresses;
  * large inlined media (base64 video and images) move out into files beside the page,
    so the Access Genie Retail demo no longer ships 17 MB of HTML.
Behaviour, wording and deep links (#p=, ?bp=, #/m/<module>/<camera>) are untouched.

Run from the repository root:  python3 app/scripts/migrate/move_demos.py
"""
import base64
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DEMOS = ROOT / 'app/public/demos'
MIN_BYTES = 40_000  # leave small inlined icons and logos where they are

EXT = {'video/webm': 'webm', 'video/mp4': 'mp4', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
       'image/gif': 'gif', 'image/svg+xml': 'svg', 'audio/mpeg': 'mp3', 'audio/wav': 'wav', 'audio/ogg': 'ogg'}


def rewrite_links(s: str) -> str:
    s = re.sub(r'(?:\.\./)+fonts/', '/fonts/', s)
    s = re.sub(r'(?:\.\./)+products/([\w-]+)\.html', r'/products/\1/', s)
    s = re.sub(r'(?:\.\./)+demos/traffic-analytics/index\.html', '/demos/traffic-analytics/', s)
    s = re.sub(r'(?:\.\./)+demos/([\w-]+)\.html', r'/demos/\1/', s)
    s = re.sub(r'(["\'])(?:\.\./)+index\.html', r'\1/', s)
    return s


def extract_media(slug: str, s: str):
    out_dir = DEMOS / slug / 'media'
    moved = []

    def repl(m):
        mime, b64 = m.group(1), m.group(2)
        if len(b64) * 3 // 4 < MIN_BYTES or mime not in EXT:
            return m.group(0)
        data = base64.b64decode(b64)
        name = hashlib.sha1(data).hexdigest()[:12] + '.' + EXT[mime]
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / name).write_bytes(data)
        moved.append(len(data))
        return f'media/{name}'

    s = re.sub(r'data:([\w/+.-]+);base64,([A-Za-z0-9+/=]+)', repl, s)
    return s, moved


for page in sorted(DEMOS.glob('*/index.html')):
    slug = page.parent.name
    s = page.read_text()
    before = len(s)
    s = rewrite_links(s)
    moved = []
    if slug != 'traffic-analytics':  # its media already lives in files beside it
        s, moved = extract_media(slug, s)
    page.write_text(s)
    print(f'{slug:24} {before // 1024:>6} KB -> {len(s) // 1024:>5} KB, {len(moved)} media files ({sum(moved) // 1024} KB)')
