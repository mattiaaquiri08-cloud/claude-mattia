import { InstagramLogo, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { SITE } from '../data/site'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line px-4 pt-16 pb-10 md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src="./img/logo-oma.png" alt="OMA" width={620} height={303} loading="lazy" className="w-28" />
          <img
            src="./img/logo-sottotitolo.png"
            alt="osteria moderna"
            width={642}
            height={70}
            loading="lazy"
            className="mt-3 w-36 opacity-80"
          />
          <p className="mt-6 max-w-[34ch] text-cream/70">
            {SITE.slogan[0]} {SITE.slogan[1]}
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold text-cream">Indirizzo</h3>
          <p className="mt-3 leading-relaxed text-cream/70">
            {SITE.address}
            <br />
            {SITE.city}
          </p>
          <a
            href={SITE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-sm text-ochre underline-offset-4 hover:underline"
          >
            Apri in Google Maps
          </a>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-sm font-semibold text-cream">Contatti</h3>
          <ul className="mt-3 flex flex-col gap-1 text-cream/70">
            <li>
              <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2.5 hover:text-cream">
                <Phone size={18} />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 hover:text-cream"
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
                className="inline-flex min-h-11 items-center gap-2.5 hover:text-cream"
              >
                <InstagramLogo size={18} />
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-3 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:justify-between">
        <p>© {YEAR} {SITE.name}</p>
        <p>Mercoledì chiuso</p>
      </div>
    </footer>
  )
}
