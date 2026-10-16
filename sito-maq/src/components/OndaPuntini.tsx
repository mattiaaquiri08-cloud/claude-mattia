import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Distesa di puntini a onda in prospettiva, la stessa della copertina WhatsApp.
// Si muove piano; con "riduci movimento" resta ferma. Si ferma quando non è visibile.
export function OndaPuntini({ className = "" }: { className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const ridotto = useReducedMotion();

  useEffect(() => {
    const c = tela.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visibile = true;
    const inizio = performance.now();

    const ridimensiona = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const disegna = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const colonne = w < 700 ? 90 : 150;
      const righe = 38;
      for (let j = 0; j < righe; j++) {
        const z = j / (righe - 1);
        const persp = 0.35 + z * 1.25;
        for (let i = 0; i < colonne; i++) {
          const u = i / (colonne - 1) - 0.5;
          const onda = Math.sin(u * 6 + z * 5 + t * 0.35) * 0.07 + Math.cos(u * 11 - z * 4 + t * 0.22) * 0.025;
          const x = w / 2 + u * w * persp * 1.1;
          const y = h * 0.18 + z * z * h * 0.78 + onda * h * persp * 0.9;
          if (x < -10 || x > w + 10 || y > h + 10) continue;
          const a = (0.08 + 0.5 * z) * (1 - Math.abs(u) * 1.2);
          if (a <= 0) continue;
          const k = i / (colonne - 1);
          ctx.fillStyle = `rgba(${Math.round(150 + k * 100)},${Math.round(110 + k * 60)},${Math.round(255 - k * 40)},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.6 + z * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const ciclo = (ora: number) => {
      if (visibile) disegna((ora - inizio) / 1000);
      raf = requestAnimationFrame(ciclo);
    };

    ridimensiona();
    if (ridotto) {
      disegna(0);
    } else {
      raf = requestAnimationFrame(ciclo);
    }

    const ro = new ResizeObserver(() => {
      ridimensiona();
      if (ridotto) disegna(0);
    });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visibile = e.isIntersecting;
    });
    io.observe(c);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [ridotto]);

  return <canvas ref={tela} className={className} aria-hidden="true" />;
}
