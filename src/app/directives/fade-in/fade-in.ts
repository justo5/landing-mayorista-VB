import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject, input } from '@angular/core';

/**
 * Fades the host element in (opacity only, no movement) the first time it enters the viewport.
 * Falls back to instantly visible when IntersectionObserver is unavailable or the user prefers
 * reduced motion, so the animation is purely an enhancement, never a content blocker.
 */
@Directive({
  selector: '[appFadeIn]',
})
export class FadeIn implements OnInit, OnDestroy {
  readonly appFadeInDelay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'fade-in');
    if (this.appFadeInDelay()) {
      this.renderer.setStyle(host, 'transition-delay', `${this.appFadeInDelay()}ms`);
    }

    const reducedMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reducedMotion) {
      this.renderer.addClass(host, 'fade-in--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.renderer.addClass(host, 'fade-in--visible');
          this.observer?.unobserve(host);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
