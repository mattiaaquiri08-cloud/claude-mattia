import { FacebookLogo, InstagramLogo } from '@phosphor-icons/react'
import { business } from '../content'

/* Profili social del centro: compaiono solo quelli con un link verificato. */
export const socials = [
  { label: 'Facebook', href: business.facebookUrl, Icon: FacebookLogo },
  { label: 'Instagram', href: business.instagramUrl, Icon: InstagramLogo },
].filter((s): s is { label: string; href: string; Icon: typeof FacebookLogo } => Boolean(s.href))
