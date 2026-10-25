/* Caricamento progressivo dei frame.
 * Ordine "binario" (idea ripresa dal componente Image Sequence di joyco su 21st):
 * prima il frame 0, poi i quarti di giro, poi gli ottavi... Così la rotazione è
 * scrubbabile quasi subito a bassa risoluzione angolare e si raffina man mano. */

function binaryOrder(count: number): number[] {
  const order = [0];
  const seen = new Set(order);
  let step = count;
  while (step > 1) {
    step = Math.ceil(step / 2);
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  for (let i = 0; i < count; i++) if (!seen.has(i)) order.push(i);
  return order;
}

export class FrameSequence {
  private images: Array<HTMLImageElement | undefined>;
  private started = false;
  private resolveReady!: () => void;
  readonly ready: Promise<void>;
  onProgress?: (loaded: number) => void;
  loaded = 0;

  constructor(
    readonly count: number,
    private readonly url: (i: number) => string,
    private readonly concurrency = 6,
  ) {
    this.images = new Array(count);
    this.ready = new Promise((r) => (this.resolveReady = r));
  }

  load() {
    if (this.started) return;
    this.started = true;
    const queue = binaryOrder(this.count);
    const next = () => {
      const i = queue.shift();
      if (i === undefined) return;
      const img = new Image();
      img.decoding = "async";
      img.src = this.url(i);
      img
        .decode()
        .then(() => {
          this.images[i] = img;
          this.loaded++;
          if (i === 0) this.resolveReady();
          this.onProgress?.(this.loaded);
        })
        .catch(() => {
          /* frame mancante: verrà usato il più vicino disponibile */
          if (i === 0) this.resolveReady();
        })
        .finally(next);
    };
    for (let k = 0; k < this.concurrency; k++) next();
  }

  has(i: number) {
    return this.images[i] !== undefined;
  }

  exact(i: number) {
    return this.images[i] ?? null;
  }

  /** Il frame richiesto o, se non è ancora arrivato, il più vicino già caricato. */
  nearest(i: number) {
    if (this.images[i]) return this.images[i]!;
    for (let d = 1; d < this.count / 2; d++) {
      const a = this.images[(i + d) % this.count];
      if (a) return a;
      const b = this.images[(i - d + this.count) % this.count];
      if (b) return b;
    }
    return null;
  }
}
