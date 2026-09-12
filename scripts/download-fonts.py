"""Vendor the Latin and Vietnamese font subsets used by the portfolio."""
from pathlib import Path
from urllib.request import Request, urlopen
import re

root = Path(__file__).resolve().parents[1]
folder = root / 'public/fonts'
folder.mkdir(parents=True, exist_ok=True)
url = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400..800&family=Inter:wght@400..700&display=swap'
request = Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'})
css = urlopen(request).read().decode()
rules = []
for subset, rule in re.findall(r'/\* ([^*]+) \*/\s*(@font-face\s*\{[^}]+\})', css):
    if subset.strip() not in ('latin', 'vietnamese'):
        continue
    remote = re.search(r'url\(([^)]+)\)', rule).group(1)
    family = re.search(r"font-family: '([^']+)'", rule).group(1).lower()
    weight = re.search(r'font-weight: ([^;]+)', rule).group(1).replace(' ', '-')
    name = f'{family}-{subset.strip()}-{weight}.woff2'
    (folder / name).write_bytes(urlopen(remote).read())
    rules.append(rule.replace(remote, f'/fonts/{name}'))
if not rules:
    raise RuntimeError(f'Expected subset declarations. Response: {css[:1000]}')
(root / 'src/styles/fonts.css').write_text('\n'.join(dict.fromkeys(rules)))
print(f'Vendored {len(rules)} font faces.')
for family in ('outfit', 'inter'):
    license_url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    (folder / f'{family}-OFL.txt').write_bytes(urlopen(license_url).read())
