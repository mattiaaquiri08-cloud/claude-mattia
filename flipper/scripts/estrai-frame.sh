#!/usr/bin/env bash
# Rigenera la sequenza di FLIPPER (200 frame = un giro completo) dal video 360°.
# Uso: scripts/estrai-frame.sh percorso/video_3d_flipper.mp4
# Richiede ffmpeg e Python con numpy e Pillow. Il video originale ha 97 frame a 24 fps e non chiude
# perfettamente il giro: i frame mancanti vengono interpolati per evitare
# il salto tra ultimo e primo frame.
set -euo pipefail
VIDEO="$1"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/frames"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
MI="minterpolate=mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"

mkdir -p "$TMP"/{raw,mi,p1,p2,seq,a,b}
ffmpeg -v error -i "$VIDEO" -vsync 0 "$TMP/raw/f_%03d.png"
# 1. Raddoppio dei frame (rotazione da 3,6° a 1,8° per frame).
ffmpeg -v error -i "$VIDEO" -vf "$MI:fps=48" -vsync 0 "$TMP/mi/m_%03d.png"
# 2. Chiusura del giro: 96 -> 97 e 97 -> 1.
cp "$TMP/raw/f_095.png" "$TMP/a/a_1.png"; cp "$TMP/raw/f_096.png" "$TMP/a/a_2.png"
cp "$TMP/raw/f_097.png" "$TMP/a/a_3.png"; cp "$TMP/raw/f_001.png" "$TMP/a/a_4.png"
cp "$TMP/raw/f_096.png" "$TMP/b/a_1.png"; cp "$TMP/raw/f_097.png" "$TMP/b/a_2.png"
cp "$TMP/raw/f_001.png" "$TMP/b/a_3.png"; cp "$TMP/raw/f_002.png" "$TMP/b/a_4.png"
ffmpeg -v error -framerate 1 -i "$TMP/a/a_%d.png" -vf "$MI:fps=2" -vsync 0 "$TMP/p1/o_%02d.png"
ffmpeg -v error -framerate 1 -i "$TMP/b/a_%d.png" -vf "$MI:fps=8" -vsync 0 "$TMP/p2/o_%02d.png"

n=0
add() { n=$((n + 1)); cp "$1" "$TMP/seq/s_$(printf %03d $n).png"; }
for i in $(seq 1 191); do add "$TMP/mi/m_$(printf %03d "$i").png"; done
add "$TMP/p1/o_04.png"; add "$TMP/p1/o_05.png"
for i in $(seq 10 16); do add "$TMP/p2/o_$i.png"; done

# 3. Ritaglio e scontorno: il fondo nero diventa trasparente (alpha dalla
#    luminosità, colori "de-premoltiplicati" sui bordi), argento un po' schiarito.
#    FLIPPER viene poi colorato nel browser, quindi i frame restano argento.
mkdir -p "$TMP/alpha"
python3 - "$TMP/seq" "$TMP/alpha" <<'PY'
import os, sys
import numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
T = 34.0
for f in sorted(os.listdir(src)):
    a = np.asarray(Image.open(os.path.join(src, f)).convert("RGB")).astype(np.float32)[90:750, 80:480]
    m = a.max(axis=2)
    alpha = np.clip((m - 7.0) / (T - 7.0), 0, 1)
    rgb = np.where(alpha[..., None] > 0, np.clip(a / np.minimum(1, np.maximum(m / T, 1e-3))[..., None], 0, 255), 0)
    rgb = 255.0 * (rgb / 255.0) ** 0.86
    Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), "RGBA").save(os.path.join(dst, f))
PY

mkdir -p "$OUT/d" "$OUT/m"
ffmpeg -v error -y -framerate 24 -i "$TMP/alpha/s_%03d.png" \
  -vf "scale=600:990:flags=lanczos,unsharp=5:5:0.3" -pix_fmt yuva420p \
  -c:v libwebp -quality 82 -compression_level 6 -start_number 0 "$OUT/d/%03d.webp"
ffmpeg -v error -y -framerate 24 -i "$TMP/alpha/s_%03d.png" \
  -vf "scale=480:792:flags=lanczos,unsharp=5:5:0.22" -pix_fmt yuva420p \
  -c:v libwebp -quality 78 -compression_level 6 -start_number 0 "$OUT/m/%03d.webp"
echo "Creati $n frame in $OUT"
