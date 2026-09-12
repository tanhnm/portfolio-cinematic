"""Generate web derivatives; original footage stays untouched. Requires imageio-ffmpeg."""
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools'))
import imageio_ffmpeg

binary = imageio_ffmpeg.get_ffmpeg_exe()
source = ROOT / 'src/assets/cinematic'
output = ROOT / 'public/media'
output.mkdir(parents=True, exist_ok=True)
report = []

def encode(args):
    subprocess.run([binary, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)

for film in sorted(source.glob('*.mp4')):
    name = film.stem
    target = output / f'{name}.mp4'
    encode(['-i', str(film), '-an', '-vf', "scale='min(1280,iw)':-2,fps=24", '-c:v', 'libx264', '-crf', '27', '-preset', 'fast', '-threads', '2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)])
    encode(['-ss', '1', '-i', str(film), '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2", '-quality', '78', str(output / f'{name}.webp')])
    report.append({'file': film.name, 'originalBytes': film.stat().st_size, 'webBytes': target.stat().st_size})
    print(json.dumps(report[-1]), flush=True)

encode(['-i', str(source / 'PhuYenShort-1.mp4'), '-t', '12', '-an', '-vf', 'scale=960:-2,fps=24', '-c:v', 'libx264', '-crf', '28', '-preset', 'fast', '-threads', '2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output / 'hero-loop.mp4')])
(output / 'sizes.json').write_text(json.dumps(report, indent=2))
