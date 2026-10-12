import manifest from "../data/images.generated.json";

type ManifestEntry = { width: number; height: number; widths: number[]; lqip: string };
const MANIFEST = manifest as Record<string, ManifestEntry>;

declare global {
  interface Window {
    __NANA_IMG?: Record<string, string>;
  }
}

/** Versione "file unico" (npm run build:single): le foto sono incorporate nella pagina. */
export const SINGLE_FILE = import.meta.env.VITE_SINGLE === "1";
const inlined = (url: string) => (typeof window !== "undefined" && window.__NANA_IMG?.[url]) || url;

export function photoMeta(key: string) {
  const m = MANIFEST[key];
  if (!m) throw new Error(`Foto mancante nel manifest: ${key}. Esegui "npm run images".`);
  return m;
}

export function photoSrc(key: string, width?: number, ext: "avif" | "webp" = "webp") {
  if (SINGLE_FILE) return inlined(`/img/${key}-800.webp`);
  const m = photoMeta(key);
  const w = width ?? m.widths[m.widths.length - 1];
  return `/img/${key}-${w}.${ext}`;
}

type PhotoProps = {
  /** chiave nel manifest, es. "galleria/sala-arco" */
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** mantiene le proporzioni originali (true) oppure riempie il contenitore (false) */
  intrinsic?: boolean;
};

/** Immagine responsive AVIF/WebP con segnaposto sfocato e spazio riservato (niente salti di layout). */
export function Photo({ id, alt, sizes, className = "", imgClassName = "", priority = false, intrinsic = true }: PhotoProps) {
  const m = photoMeta(id);
  const srcset = (ext: "avif" | "webp") => m.widths.map((w) => `/img/${id}-${w}.${ext} ${w}w`).join(", ");
  const fallbackWidth = m.widths.find((w) => w >= 900) ?? m.widths[m.widths.length - 1];

  if (SINGLE_FILE) {
    return (
      <span
        className={`block overflow-hidden bg-lino bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${m.lqip})`, ...(intrinsic ? { aspectRatio: `${m.width} / ${m.height}` } : null) }}
      >
        <img src={photoSrc(id)} alt={alt} width={m.width} height={m.height} decoding="async" className={`block size-full object-cover ${imgClassName}`} />
      </span>
    );
  }

  return (
    <picture
      className={`block overflow-hidden bg-lino bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${m.lqip})`, ...(intrinsic ? { aspectRatio: `${m.width} / ${m.height}` } : null) }}
    >
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/img/${id}-${fallbackWidth}.webp`}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`block size-full object-cover ${imgClassName}`}
      />
    </picture>
  );
}
