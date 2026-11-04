import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from '@phosphor-icons/react'

export type VideoInfo = { src: string; poster: string; label: string }

/**
 * Video verticale di una sezione: muto e in loop, si scarica e parte solo quando è a schermo
 * e si ferma quando esce. Il pulsante in basso lo mette in pausa (con "riduci movimento" parte fermo).
 */
export function VideoSezione({ video, className = '' }: { video: VideoInfo; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  // null finché il visitatore non tocca il pulsante: allora decide lui
  const [scelta, setScelta] = useState<'play' | 'pausa' | null>(null)
  const [inPlay, setInPlay] = useState(false)
  const pausa = scelta === null ? !!reduce : scelta === 'pausa'

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView && !pausa) v.play().catch(() => setInPlay(false))
    else v.pause()
  }, [inView, pausa])

  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-media)] bg-ink ${className}`}>
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.label}
        onPlay={() => setInPlay(true)}
        onPause={() => setInPlay(false)}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => setScelta(inPlay ? 'pausa' : 'play')}
        aria-label={inPlay ? 'Metti in pausa il video' : 'Fai partire il video'}
        className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-paper/85 text-ink shadow-md backdrop-blur"
      >
        {inPlay ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
      </button>
    </div>
  )
}
