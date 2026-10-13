"""
Preventivo di manutenzione del sito per Exotique & Estetique.
Usa solo i font standard del PDF (nessun font incorporato): il file resta leggero.
Uso: python3 scripts/preventivo.py  ->  ../consegna/Preventivo_Exotique-Estetique.pdf
"""
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

INK = HexColor('#151414')
SOFT = HexColor('#5a5654')
LINE = HexColor('#d9d6d0')
LACCA = HexColor('#b3201c')
PAPER = HexColor('#f3f2ef')

OUT = '../consegna/Preventivo_Exotique-Estetique.pdf'
W, H = A4
M = 56  # margine laterale

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle('Preventivo manutenzione sito - Exotique & Estetique')
c.setAuthor('Mattia')
c.setSubject('Manutenzione del sito web per 2 anni')


def text(x, y, s, font='Helvetica', size=10, color=INK, align='left'):
    c.setFont(font, size)
    c.setFillColor(color)
    if align == 'right':
        c.drawRightString(x, y, s)
    elif align == 'center':
        c.drawCentredString(x, y, s)
    else:
        c.drawString(x, y, s)


def rule(y, color=LINE, x1=M, x2=W - M, width=0.6):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


# Fascia superiore scura con il marchio
c.setFillColor(INK)
c.rect(0, H - 150, W, 150, stroke=0, fill=1)
c.setFillColor(LACCA)
c.rect(M, H - 150, 1.4, 150, stroke=0, fill=1)  # la linea rossa dello specchio

text(M + 20, H - 78, 'Exotique', 'Times-Roman', 30, HexColor('#eeebe6'))
w1 = c.stringWidth('Exotique ', 'Times-Roman', 30)
text(M + 20 + w1, H - 78, '&', 'Times-Italic', 30, HexColor('#dd3f33'))
w2 = c.stringWidth('& ', 'Times-Italic', 30)
text(M + 20 + w1 + w2, H - 78, 'Estetique', 'Times-Roman', 30, HexColor('#eeebe6'))
text(M + 20, H - 104, 'CENTRO ESTETICO A LA STORTA, ROMA', 'Helvetica', 7.5, HexColor('#a9a49e'))
text(W - M, H - 78, 'Preventivo', 'Times-Italic', 22, HexColor('#eeebe6'), 'right')
text(W - M, H - 104, '13 ottobre 2026', 'Helvetica', 9, HexColor('#a9a49e'), 'right')

# Intestazione: cliente e oggetto
y = H - 200
text(M, y, 'CLIENTE', 'Helvetica-Bold', 7.5, SOFT)
text(M, y - 18, 'Exotique & Estetique, Naomi', 'Helvetica-Bold', 10.5)
text(M, y - 33, 'Via Giuseppe Calenzuoli, 3', 'Helvetica', 10, SOFT)
text(M, y - 47, '00123 Roma (La Storta)', 'Helvetica', 10, SOFT)

x2 = W / 2 + 20
text(x2, y, 'OGGETTO', 'Helvetica-Bold', 7.5, SOFT)
text(x2, y - 18, 'Gestione e manutenzione', 'Helvetica-Bold', 10.5)
text(x2, y - 33, 'del sito web exotiqueestetique.it', 'Helvetica', 10, SOFT)
text(x2, y - 47, 'Durata del servizio: 2 anni', 'Helvetica', 10, SOFT)

# Introduzione
y -= 92
rule(y + 22)
text(M, y, 'Il nuovo sito di Exotique & Estetique ti verrà presentato di persona.', 'Times-Roman', 13)
text(M, y - 18, 'Per tenerlo sempre aggiornato ti propongo due pacchetti di manutenzione,', 'Times-Roman', 13)
text(M, y - 36, 'entrambi della durata di due anni.', 'Times-Roman', 13)

# Pacchetti: due riquadri affiancati
y -= 78
box_w = (W - 2 * M - 20) / 2
box_h = 176
packs = [
    ('Pacchetto Base', '3', '300', False),
    ('Pacchetto Plus', '6', '450', True),
]
for i, (name, n, price, accent) in enumerate(packs):
    bx = M + i * (box_w + 20)
    by = y - box_h
    c.setFillColor(PAPER if not accent else INK)
    c.setStrokeColor(LINE if not accent else INK)
    c.setLineWidth(0.8)
    c.rect(bx, by, box_w, box_h, stroke=1, fill=1)
    fg = INK if not accent else HexColor('#eeebe6')
    sub = SOFT if not accent else HexColor('#a9a49e')
    c.setFillColor(LACCA)
    c.rect(bx, y - 3, box_w, 3, stroke=0, fill=1)
    text(bx + 22, y - 36, name, 'Times-Roman', 18, fg)
    text(bx + 22, y - 54, '2 anni di servizio', 'Helvetica', 9, sub)
    text(bx + 22, y - 106, price, 'Times-Roman', 54, fg)
    pw = c.stringWidth(price, 'Times-Roman', 54)
    text(bx + 26 + pw, y - 106, '€', 'Times-Roman', 26, fg)
    text(bx + 22, y - 124, 'in unica soluzione', 'Helvetica', 9, sub)
    rule(by + 44, color=(LINE if not accent else HexColor('#3a3836')), x1=bx + 22, x2=bx + box_w - 22)
    text(bx + 22, by + 22, f'{n} modifiche al mese', 'Helvetica-Bold', 10.5, fg)

# Cosa comprende
y -= box_h + 44
text(M, y, 'COSA COMPRENDE UNA MODIFICA', 'Helvetica-Bold', 7.5, SOFT)
items = [
    'Aggiornamento di testi e descrizioni',
    'Sostituzione o aggiunta di foto',
    'Prezzi, orari e listino dei trattamenti',
    'Aggiunta o modifica dei trattamenti',
]
for k, it in enumerate(items):
    yy = y - 22 - k * 18
    c.setFillColor(LACCA)
    c.rect(M, yy + 3, 5, 1.2, stroke=0, fill=1)
    text(M + 14, yy, it, 'Helvetica', 10.5)

# Condizioni di pagamento
x2c = W / 2 + 20
text(x2c, y, 'PAGAMENTO', 'Helvetica-Bold', 7.5, SOFT)
text(x2c, y - 22, 'In un’unica soluzione,', 'Helvetica', 10.5)
text(x2c, y - 40, 'all’inizio del servizio.', 'Helvetica', 10.5)
text(x2c, y - 58, 'Non sono previsti pagamenti mensili.', 'Helvetica-Bold', 10.5)
# Confronto: lo stesso servizio a rate costerebbe il doppio
c.setFillColor(LACCA)
c.rect(x2c, y - 99, 1.4, 26, stroke=0, fill=1)
text(x2c + 10, y - 82, 'A 25 \u20ac al mese per 24 mesi spenderesti 600 \u20ac,', 'Helvetica', 9.5, INK)
text(x2c + 10, y - 96, 'il doppio del Pacchetto Base.', 'Helvetica-Bold', 9.5, LACCA)

# Accettazione
y -= 134
rule(y + 18)
text(M, y, 'PER ACCETTAZIONE', 'Helvetica-Bold', 7.5, SOFT)
text(M, y - 22, 'Pacchetto scelto:', 'Helvetica', 10, SOFT)
for k, label in enumerate(['Base  (300 €)', 'Plus  (450 €)']):
    bx = M + 100 + k * 120
    c.setStrokeColor(INK)
    c.setLineWidth(0.8)
    c.rect(bx, y - 25, 10, 10, stroke=1, fill=0)
    text(bx + 16, y - 22, label, 'Helvetica', 10)

text(M, y - 60, 'Data', 'Helvetica', 9, SOFT)
rule(y - 64, color=INK, x1=M + 30, x2=M + 190, width=0.5)
text(x2c, y - 60, 'Firma', 'Helvetica', 9, SOFT)
rule(y - 64, color=INK, x1=x2c + 32, x2=W - M, width=0.5)

# Piede
rule(36)
text(M, 22, 'Preventivo per Exotique & Estetique, Via Giuseppe Calenzuoli 3, 00123 Roma', 'Helvetica', 7.5, SOFT)
text(W - M, 22, 'Mattia', 'Times-Italic', 11, INK, 'right')

c.showPage()
c.save()
print('creato', OUT)
