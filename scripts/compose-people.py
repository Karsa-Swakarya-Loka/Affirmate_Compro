# Composite the three founder cut-outs onto one shared backdrop (brand tint with a soft lighter centre), same
# canvas (4:5), same headroom and scale, so the portraits read as one set.
import sys
from PIL import Image, ImageDraw, ImageFilter

# Sources: the client cut-outs (transparent PNG) as sent on 24 Oct 2026; pass the output folder as argv[1].
SRC = {
  'yukifri-nazir': r'C:\Users\Lenovo\Downloads\Potret Profesional Pria Bersetelan Pinstripe.png',
  'deny-y-imran':  r'C:\Users\Lenovo\Downloads\Potret Pria Formal Berlatar Transparan.png',
  'mulyadi':       r'C:\Users\Lenovo\Downloads\Pria Senior Berkacamata dengan Jam Tangan.png',
}
OUT = sys.argv[1]
W, H = 1200, 1500
BG, GLOW = (223, 233, 216), (244, 242, 236)   # --brand-tint, --surface

def backdrop():
    bg = Image.new('RGB', (W, H), BG)
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((W*0.05, H*0.02, W*0.95, H*0.78), fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(220))
    return Image.composite(Image.new('RGB', (W, H), GLOW), bg, glow)

for name, path in SRC.items():
    im = Image.open(path).convert('RGBA')
    bbox = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    cut = im.crop(bbox)
    sw, sh = cut.size
    # Same rule for all: the figure fills 92% of the canvas height, never more than 94% of its width.
    scale = min(0.92 * H / sh, 0.94 * W / sw)
    cut = cut.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    canvas = backdrop()
    x = (W - cut.width) // 2
    y = H - cut.height            # bottom-aligned: the body runs out of the frame, as in the originals
    canvas.paste(cut, (x, y), cut)
    canvas.save(f'{OUT}/{name}.jpg', 'JPEG', quality=86, optimize=True, progressive=True)
    print(name, 'subject', (sw, sh), 'scale', round(scale, 3), 'placed at', (x, y), 'head room', y)
