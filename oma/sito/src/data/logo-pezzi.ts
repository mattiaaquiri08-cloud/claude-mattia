// Generato da uno script: i pezzi del logo tondo (versione urban 1) da montare uno alla volta nella splash.
// x, y, w, h sono in percentuale del riquadro del logo.
export type PezzoLogo = {
  tipo: 'disco' | 'onda' | 'perla' | 'lettera' | 'riga'
  src: string
  x: number
  y: number
  w: number
  h: number
}

export const LOGO_PEZZI: PezzoLogo[] = [
  { tipo: 'disco', src: './img/logo-pezzo-disco.webp', x: 0.0, y: 0.0, w: 100.0, h: 100.0 },
  { tipo: 'onda', src: './img/logo-pezzo-onda-1.webp', x: 12.402, y: 0.879, w: 86.914, h: 98.535 },
  { tipo: 'onda', src: './img/logo-pezzo-onda-2.webp', x: 57.91, y: 20.117, w: 30.469, h: 58.105 },
  { tipo: 'onda', src: './img/logo-pezzo-onda-4.webp', x: 20.117, y: 62.5, w: 46.387, h: 36.328 },
  { tipo: 'onda', src: './img/logo-pezzo-onda-3.webp', x: 1.074, y: 17.871, w: 44.727, h: 71.191 },
  { tipo: 'perla', src: './img/logo-pezzo-perla-1.webp', x: 47.656, y: 22.168, w: 5.371, h: 8.887 },
  { tipo: 'perla', src: './img/logo-pezzo-perla-4.webp', x: 67.285, y: 61.035, w: 6.445, h: 6.543 },
  { tipo: 'perla', src: './img/logo-pezzo-perla-5.webp', x: 23.535, y: 76.758, w: 10.742, h: 9.082 },
  { tipo: 'perla', src: './img/logo-pezzo-perla-3.webp', x: 21.777, y: 58.398, w: 3.809, h: 4.102 },
  { tipo: 'perla', src: './img/logo-pezzo-perla-2.webp', x: 16.016, y: 51.465, w: 5.273, h: 5.371 },
  { tipo: 'lettera', src: './img/logo-pezzo-lettera-1.webp', x: 22.656, y: 36.426, w: 14.746, h: 14.453 },
  { tipo: 'lettera', src: './img/logo-pezzo-lettera-2.webp', x: 41.602, y: 35.84, w: 17.48, h: 14.746 },
  { tipo: 'lettera', src: './img/logo-pezzo-lettera-3.webp', x: 62.207, y: 35.156, w: 14.941, h: 15.527 },
  { tipo: 'riga', src: './img/logo-pezzo-riga-1.webp', x: 38.086, y: 52.539, w: 23.73, h: 2.539 },
  { tipo: 'riga', src: './img/logo-pezzo-riga-2.webp', x: 31.445, y: 56.836, w: 37.305, h: 2.539 },
]
