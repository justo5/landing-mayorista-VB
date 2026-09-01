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

  readonly scrollY = this.scrollYSignal.asReadonly();
  readonly activeSection = this.activeSectionSignal.asReadonly();

  readonly navScrolled = computed(() => this.scrollYSignal() > 40);

  readonly backdropProgress = computed(() => {
    const vh = isBrowser ? window.innerHeight : 800;
    return Math.min(Math.max(this.scrollYSignal() / (vh * 0.9), 0), 1);
  });

  readonly backdropBlurPx = computed(() => (this.backdropProgress() * 26).toFixed(1));

  readonly backdropSaturate = computed(() => (1 + this.backdropProgress() * 0.08).toFixed(3));

  readonly scrimGradient = computed(() => {
    const p = this.backdropProgress();
    const top = (0.28 + p * 0.44).toFixed(3);
    const bottom = (0.55 + p * 0.33).toFixed(3);
    return `linear-gradient(180deg, rgba(14,28,37,${top}), rgba(11,23,31,${bottom}))`;
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
