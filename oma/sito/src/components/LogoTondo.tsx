import { RIGHE_LOGO, rigaBox, type RigaLogo } from '../data/logo-sottotitolo'

/** Una riga del sottotitolo, nitida a qualsiasi misura. */
export function RigaSottotitolo({ riga }: { riga: RigaLogo }) {
  return (
    <svg viewBox="0 0 40 3.6" className="block h-full w-full overflow-visible" aria-hidden="true">
      {riga.trattini && (
        <g stroke="#f8f7e8" strokeWidth={0.26}>
          <line x1={8.1} x2={12.6} y1={1.75} y2={1.75} />
          <line x1={27.4} x2={31.9} y1={1.75} y2={1.75} />
        </g>
      )}
      <text
        x={20}
        y={2.85}
        textAnchor="middle"
        textLength={riga.larghezza}
        lengthAdjust="spacing"
        fill="#f8f7e8"
        style={{ fontFamily: 'var(--font-display)', fontSize: 3.15, fontWeight: 500 }}
      >
        {riga.testo}
      </text>
    </svg>
  )
}

/** Il logo tondo completo (immagine + sottotitolo in SVG), per il footer. */
export function LogoTondo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} role="img" aria-label="OMA Osteria Moderna Tradizione">
      <img src="./img/logo-tondo.webp" alt="" width={640} height={640} loading="lazy" className="h-full w-full" />
      {RIGHE_LOGO.map((r) => (
        <div key={r.testo} style={{ ...rigaBox, top: `${r.top}%` }}>
          <RigaSottotitolo riga={r} />
        </div>
      ))}
    </div>
  )
}
