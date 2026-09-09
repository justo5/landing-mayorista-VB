import { Injectable, signal, computed } from '@angular/core';

const isBrowser = typeof window !== 'undefined';

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  private readonly scrollYSignal = signal(0);
  private readonly activeSectionSignal = signal(0);

  private heroEl: HTMLElement | null = null;
  private sectionEls: HTMLElement[] = [];
  private ticking = false;

  /** Falls back to the navbar's actual unscrolled height, in case it's read before the navbar registers. */
  private readonly navHeightSignal = signal(96);

  readonly scrollY = this.scrollYSignal.asReadonly();
  readonly activeSection = this.activeSectionSignal.asReadonly();
  readonly navHeight = this.navHeightSignal.asReadonly();

  readonly navScrolled = computed(() => this.scrollYSignal() > 40);

  readonly backdropProgress = computed(() => {
    const vh = isBrowser ? window.innerHeight : 800;
    return Math.min(Math.max(this.scrollYSignal() / (vh * 0.9), 0), 1);
  });

  readonly backdropBlurPx = computed(() => (2 + this.backdropProgress() * 14).toFixed(1));

  readonly backdropSaturate = computed(() => (1 + this.backdropProgress() * 0.08).toFixed(3));

  /**
   * The hero photo stays fixed behind the whole page. Over the photo itself the
   * wash is neutral white (no color cast), just enough to keep the image from
   * competing with the hero copy; by the time you've scrolled about one viewport
   * past the hero it has both faded to fully opaque AND drifted to the site's
   * kraft-cardboard tone (matching --color-bg/--color-bg-deep), so the rest of
   * the page reads as a plain cardboard-toned background with no photo
   * bleed-through or visible seam.
   */
  readonly scrimGradient = computed(() => {
    const p = this.backdropProgress();
    const lerp = (from: number, to: number) => Math.round(from + (to - from) * p);
    const topR = lerp(255, 248);
    const topG = lerp(255, 244);
    const topB = lerp(255, 233);
    const bottomR = lerp(255, 240);
    const bottomG = lerp(255, 228);
    const bottomB = lerp(255, 200);
    const top = (0.45 + p * 0.55).toFixed(3);
    const bottom = (0.65 + p * 0.35).toFixed(3);
    return `linear-gradient(180deg, rgba(${topR},${topG},${topB},${top}), rgba(${bottomR},${bottomG},${bottomB},${bottom}))`;
  });

  constructor() {
    if (!isBrowser) return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.update();
  }

  /** The hero section acts as the scroll origin, matching the original design's rect-based offset. */
  registerHero(el: HTMLElement): void {
    this.heroEl = el;
    this.update();
  }

  /** Numbered content sections, used to derive which section is "active" for the side rail dots. */
  registerSections(els: HTMLElement[]): void {
    this.sectionEls = els;
    this.update();
  }

  /** The navbar's own (unscrolled) height, so the hero can size itself to exactly fill the rest of the viewport. */
  registerNavHeight(px: number): void {
    this.navHeightSignal.set(px);
  }

  private onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(this.update);
  };

  private update = (): void => {
    this.ticking = false;
    if (!isBrowser) return;
    const vh = window.innerHeight;

    let y = this.heroEl ? -this.heroEl.getBoundingClientRect().top : 0;
    if (!isFinite(y)) y = 0;
    if (y === 0) {
      y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    this.scrollYSignal.set(y);

    let active = 0;
    this.sectionEls.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top < vh * 0.5) active = i;
    });
    this.activeSectionSignal.set(active);
  };
}
