import { InstagramLogo, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { DAY_NAMES, SITE, WEEK_ORDER } from '../data/site'
import { useLiveData } from '../lib/live-data'
import { LogoTondo } from './LogoTondo'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { hours } = useLiveData()
  const closed = WEEK_ORDER.filter((d) => hours[d].length === 0).map((d) => DAY_NAMES[d])

  return (
    <footer className="border-t border-line px-4 pt-16 pb-10 md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* Il logo tondo della splash, come firma in fondo al sito */}
          <LogoTondo className="w-40 md:w-48" />
          <p className="mt-6 max-w-[34ch] text-ink/70">
            {SITE.slogan[0]} {SITE.slogan[1]}
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold text-ink">Indirizzo</h3>
          <p className="mt-3 leading-relaxed text-ink/70">
            {SITE.address}
            <br />
            {SITE.city}
          </p>
          <a
            href={SITE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-sm text-ochre-deep underline-offset-4 hover:underline"
          >
            Apri in Google Maps
          </a>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-sm font-semibold text-ink">Contatti</h3>
          <ul className="mt-3 flex flex-col gap-1 text-ink/70">
            <li>
              <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2.5 hover:text-ink">
                <Phone size={18} />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 hover:text-ink"
              >
                <WhatsappLogo size={18} />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 hover:text-ink"
              >
                <InstagramLogo size={18} />
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-3 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:justify-between">
        <p>
          © {YEAR} {SITE.name} · {SITE.ragioneSociale}, {SITE.address}, {SITE.city} · P.IVA {SITE.piva}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {closed.length > 0 && <p>{closed.join(' e ')} chiuso</p>}
          <a href="#privacy" className="underline-offset-4 hover:text-ink hover:underline">
            Privacy e cookie
          </a>
        </div>
      </div>
    </footer>
  )
}
