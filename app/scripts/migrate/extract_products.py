"""One-off Gate 4 migration: read the legacy products/*.html pages and write their content
as data for the Astro product template.

Content is copied word for word. Structure is kept as clean HTML fragments for the sections
that differ page to page; legacy inline styles are dropped and colours become data-acc tokens.

Run from the repository root:  python3 app/scripts/migrate/extract_products.py
"""
import base64
import hashlib
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup, Comment, NavigableString, Tag

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / 'products'
OUT = ROOT / 'app/src/content/products'
MEDIA = ROOT / 'app/public/media/products'
OUT.mkdir(parents=True, exist_ok=True)

# Legacy colour variables -> design-system accents.
ACC = {'amberx': 'invest', 'violet': 'draft', 'green': 'field', 'blue': 'watch', 'saga': 'saga', 'edu': 'edu',
       'ag': 'ag', 'teal': 'blugo', 'garuda': 'garuda', 'red': 'saga', 'orange': 'ag', 'cyan': 'garuda'}
LOGOS = {'access-genie': '/logos/access-genie.webp', 'access-genie-retail': '/logos/access-genie-retail.webp',
         'blura-saga': '/logos/blura-saga.webp', 'edugenie': '/logos/edugenie.webp', 'blugo': '/logos/blugo.webp',
         'garuda': '/logos/garuda.webp', 'bluflow': '/logos/bluflow.webp', 'bluvaani': '/logos/bluvaani.webp',
         'smartcop': '/logos/smartcop.svg'}
LEGACY_DEMOS = {'traffic-analytics/index.html': '/demos/traffic-analytics/'}

KEEP_ATTRS = {'href', 'id', 'colspan', 'rowspan', 'scope', 'role', 'aria-selected', 'aria-controls', 'aria-label',
              'aria-labelledby', 'hidden', 'data-bp', 'data-v', 'data-tab', 'target', 'rel', 'alt', 'src', 'width', 'height',
              'datetime', 'title'}


def rewrite_href(h: str) -> str:
    if not h or h.startswith(('mailto:', 'tel:', 'http', '#')):
        return h
    h = h.replace('../index.html', '/')
    if h.startswith('/#') or h == '/':
        return h
    m = re.match(r'^(?:\.\./products/|\./)?([\w-]+)\.html(#.*)?$', h)
    if m:
        return f'/products/{m.group(1)}/' + (m.group(2) or '')
    m = re.match(r'^\.\./demos/(.+)$', h)
    if m:
        p = m.group(1)
        return LEGACY_DEMOS.get(p.split('#')[0], '/demos/' + re.sub(r'\.html$', '/', p.split('#')[0])) + ('#' + p.split('#', 1)[1] if '#' in p else '')
    return h


def save_image(slug: str, src: str) -> str:
    m = re.match(r'data:image/([\w+]+);base64,(.*)', src, re.S)
    if not m:
        return src
    ext = {'svg+xml': 'svg', 'jpeg': 'jpg'}.get(m.group(1), m.group(1))
    data = base64.b64decode(m.group(2))
    name = hashlib.sha1(data).hexdigest()[:12] + '.' + ext
    d = MEDIA / slug
    d.mkdir(parents=True, exist_ok=True)
    (d / name).write_bytes(data)
    return f'/media/products/{slug}/{name}'


HEX = {'0D9E80': 'blugo', '14B8A6': 'blugo', '2D6FA8': 'watch', '2070B3': 'watch', '4889C0': 'watch', 'F58120': 'ag',
       'F59E0B': 'ag', 'F5A524': 'ag', '3EA0FF': 'bluvaani', '22D3EE': 'garuda', '1ED89A': 'bluflow', 'DE6C0E': 'invest',
       '8C78C2': 'draft', '5B3FA8': 'draft', '46966E': 'field', 'EE5A24': 'saga', 'F15B26': 'saga', 'FF9A6B': 'saga',
       'FF7A45': 'saga', '5B8DEF': 'edu', '4A8DE8': 'edu', '3E7FD6': 'edu'}


def acc_of(style: str):
    m = re.search(r'--(?:c|sc|pc|ec)\s*:\s*(?:var\(--([\w-]+)\)|#([0-9A-Fa-f]{6}))', style or '')
    if not m:
        return None
    return ACC.get(m.group(1)) if m.group(1) else HEX.get(m.group(2).upper())


def clean(el: Tag, slug: str) -> Tag:
    for c in el.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()
    for t in [el, *el.find_all(True)]:
        if t.name == 'img':
            t['src'] = save_image(slug, t.get('src', ''))
            t['loading'] = 'lazy'
        if t.name == 'a' and t.get('href'):
            t['href'] = rewrite_href(t['href'])
        style = t.get('style', '')
        a = acc_of(style)
        if 'text-transform:uppercase' in style.replace(' ', '') and t.name in ('h4', 'h5', 'div', 'p'):
            t['class'] = t.get('class', []) + ['kicker']
        if t.name == 'svg':
            # Icons keep their geometry; colour comes from the surrounding accent.
            for k in list(t.attrs):
                if k not in ('viewbox', 'viewBox', 'fill', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'width', 'height'):
                    del t[k]
            t['aria-hidden'] = 'true'
            t['stroke'] = 'currentColor'
            continue
        if t.parent and t.parent.name == 'svg' or t.find_parent('svg'):
            continue
        for k in list(t.attrs):
            if k == 'class':
                continue
            if k not in KEEP_ATTRS:
                del t[k]
        if a:
            t['data-acc'] = a
    return el


def inner(el: Tag) -> str:
    return re.sub(r'\n\s*\n+', '\n', ''.join(str(c) for c in el.contents)).strip()


def text(el) -> str:
    return re.sub(r'\s+', ' ', el.get_text(' ', strip=True)).strip() if el else ''


def html_text(el) -> str:
    """Inline HTML of an element (keeps b/em/a), whitespace collapsed."""
    return re.sub(r'\s+', ' ', inner(el)).strip() if el else ''


# Wording changes made on purpose during migration, each listed for approval at Gate 4.
CHANGES = {
    'access-genie': [
        # GARUDA is its own vertical (decided 2026-11-27), as on the homepage.
        ('<span class="agv-k">Division · Policing &amp; public safety</span>', '<span class="agv-k">Separate vertical · Policing</span>'),
        # The Traffic AI demo runs 20 analytics modules, not 21.
        ('40 cameras, 21 traffic analytics', '40 cameras, 20 traffic analytics'),
    ],
}


def apply_changes(slug, data):
    raw = json.dumps(data, ensure_ascii=False)
    for old, new in CHANGES.get(slug, []):
        old_j, new_j = json.dumps(old, ensure_ascii=False)[1:-1], json.dumps(new, ensure_ascii=False)[1:-1]
        assert old_j in raw, f'{slug}: change not found: {old}'
        raw = raw.replace(old_j, new_j)
    return json.loads(raw)


marks = {}
products = {}
for f in sorted(SRC.glob('*.html')):
    slug = f.stem
    soup = BeautifulSoup(f.read_text(), 'lxml')
    head = soup.head
    title = head.title.get_text(strip=True)
    desc = (head.find('meta', attrs={'name': 'description'}) or {}).get('content', '')
    sections = soup.select('main section') or soup.select('section')

    # ---------- hero ----------
    hero = sections[0]
    crumbs = [{'label': text(a), 'href': rewrite_href(a.get('href')) if a.name == 'a' else None}
              for a in hero.select('.crumbs > a, .crumbs > b')]
    art = hero.select_one('.phero-art')
    img = art.find('img') if art else None
    svg = art.find('svg') if art else None
    hero_d = {
        'crumbs': crumbs,
        'tag': text(hero.select_one('.phero-tag')),
        'h1': text(hero.find('h1')),
        'tagline': html_text(hero.select_one('.tl')),
        'lede': html_text(hero.select_one('.ld')),
        'chips': [{'text': text(c), 'division': 'chip-div' in c.get('class', [])} for c in hero.select('.phero-meta .chip')],
        'actions': [{'label': text(a), 'href': rewrite_href(a['href']), 'primary': 'btn-p' in a.get('class', [])}
                    for a in hero.select('.phero-acts a')],
        'logo': LOGOS.get(slug) if img else None,
        'icon': str(clean(svg, slug)) if (svg and not img) else None,
        'round': bool(art and art.select_one('.mk-emb')),
        # the four-figure strip under the hero
        'facts': [{'value': text(d.find('b')), 'label': text(d.find('span'))}
                  for d in soup.select('.facts .facts-in > div')],
    }
    # previous / all GARUDA products / next, on the GARUDA suite pages
    pager = [{'label': re.sub(r'^\W+|\W+$', '', text(a)).strip(), 'href': rewrite_href(a['href']),
              'kind': 'prev' if text(a).startswith('\u2190') else 'next' if text(a).endswith('\u2192') else 'all'}
             for a in soup.select('.pfoot-nav a')]

    # ---------- modules ----------
    mod_sec = soup.select_one('section#modules')
    head_el = mod_sec.select_one('.sec-head')
    groups, items = [], []
    for g in mod_sec.select('.mx-g'):
        gh = g.select_one('.mx-gh')
        gname = text(gh.find('b'))
        groups.append({'name': gname, 'sub': text(gh.find('span')), **({'id': g['id']} if g.get('id') else {})})
        for art_el in g.select('article.mx'):
            hbtn = art_el.select_one('.mx-h')
            body = art_el.select_one('.mx-b')
            mat = hbtn.select_one('.mat')
            go = body.select_one('a.mx-go')
            ps = [html_text(clean(p, slug)) for p in body.find_all('p', recursive=False)]
            dl = body.find('dl')
            items.append({
                'id': art_el['id'],
                'n': text(hbtn.select_one('.mx-n')),
                'name': text(hbtn.select_one('.mx-t b')),
                'tag': text(hbtn.select_one('.mx-t em')),
                'group': gname,
                'summary': ps[0] if ps else '',
                **({'more': ps[1:]} if len(ps) > 1 else {}),
                **({'details': [{'label': text(d.find('dt')), 'text': html_text(clean(d.find('dd'), slug))}
                                for d in dl.find_all('div', recursive=False)]} if dl else {}),
                **({'maturity': {'kind': {'mat-e': 'established', 'mat-s': 'integration', 'mat-i': 'proposed'}[
                    [c for c in mat['class'] if c.startswith('mat-')][0]], 'label': text(mat)}} if mat else {}),
                **({'go': {'label': text(go), 'href': rewrite_href(go['href'])}} if go else {}),
            })
    modules = {
        'eyebrow': text(head_el.select_one('.eyebrow')),
        'title': text(head_el.find('h2')),
        'lede': html_text(head_el.select_one('.lede')),
        'groups': groups,
        'items': items,
    }

    # ---------- the rest ----------
    body_sections, demo, related, cta = [], None, None, None
    level = [1]  # deepest heading so far: the hero h1, then the module explorer's h3/h4
    for sec in sections[1:]:
        t = sec.get('data-title') or ''
        if sec.get('id') == 'modules':
            body_sections.append({'kind': 'modules'})
            level[0] = 4
            continue
        if sec.select_one('.cta-strip'):
            strip = sec.select_one('.cta-strip')
            mail = strip.select_one('a[href^="mailto:"]')
            subj = re.search(r'subject=([^&]+)', mail['href']).group(1) if mail else ''
            from urllib.parse import unquote
            cta = {'title': text(strip.find('h3')), 'text': text(strip.find('p')), 'subject': unquote(subj)}
            continue
        if t == 'Related products':
            related = {'title': text(sec.find(['h2', 'h3'])),
                       'slugs': [re.sub(r'\.html.*', '', a['href']).split('/')[-1] for a in sec.select('a.sib')],
                       # the one-line description each card carries on this page
                       'lines': [list(a.stripped_strings)[1] if len(list(a.stripped_strings)) > 1 else ''
                                 for a in sec.select('a.sib')]}
            for a in sec.select('a.sib'):
                s2 = re.sub(r'\.html.*', '', a['href']).split('/')[-1]
                mk = a.select_one('.mk, .mk-wide')
                if mk and mk.find('svg') and s2 not in LOGOS:
                    marks[s2] = str(clean(mk.find('svg'), s2))
            continue
        band = sec.select_one('a.demo-band')
        if band and len(text(sec)) - len(text(band)) < 5:
            demo = {'title': t, 'kicker': text(band.find('em')), 'heading': text(band.find('b')),
                    'text': text(band.select_one('div > span')), 'button': text(band.select_one('.btn')),
                    'href': rewrite_href(band['href'])}
            continue
        wrap = sec.select_one('.wrap') or sec
        clean(wrap, slug)
        # Headings never skip a level (h2 then h4). A heading that has to move keeps its look
        # through an lv<original level> class.
        for hd in wrap.find_all(['h2', 'h3', 'h4', 'h5', 'h6']):
            orig = int(hd.name[1])
            new = min(orig, level[0] + 1)
            if new != orig:
                hd.name = f'h{new}'
                hd['class'] = hd.get('class', []) + [f'lv{orig}']
            level[0] = new
        # Wide tables and role strips scroll sideways on phones, so they take keyboard focus.
        for box in wrap.select('.tbl-w, .sx-roles'):
            box['tabindex'] = '0'
        body_sections.append({
            'kind': 'html', 'title': t, 'id': sec.get('id'),
            'tone': 'deep' if ({'band-dark', 'band-deep'} & set(sec.get('class', []))) else (
                'alt' if 'band-alt' in sec.get('class', []) else 'base'),
            'tight': 'band-tight' in sec.get('class', []),
            'html': inner(wrap),
        })

    products[slug] = apply_changes(slug, {
        'slug': slug, 'title': title, 'description': desc, 'accent': acc_of(hero.get('style', '')),
        'hero': hero_d, 'modules': modules, 'sections': body_sections, 'demo': demo, 'related': related, 'pager': pager, 'cta': cta,
    })
    (OUT / f'{slug}.json').write_text(json.dumps(products[slug], ensure_ascii=False, indent=1))

(ROOT / 'app/src/data/marks.json').write_text(json.dumps(marks, ensure_ascii=False, indent=1))
print(len(products), 'products;', sum(len(p['modules']['items']) for p in products.values()), 'modules;',
      len(marks), 'icon marks')
