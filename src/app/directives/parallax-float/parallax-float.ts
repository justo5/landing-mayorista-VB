import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import { Scroll } from '../../services/scroll';

/**
 * Floats the host element opposite its own distance from the viewport center — mirrors the
 * original data-float behaviour. Recomputed on every scroll tick via the shared scrollY signal.
 */
@Directive({
  selector: '[appParallaxFloat]',
})
export class ParallaxFloat {
  readonly appParallaxFloat = input.required<number>();

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly scroll = inject(Scroll);

  constructor() {
    effect(() => {
      this.scroll.scrollY();
      const rect = this.el.nativeElement.getBoundingClientRect();
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
      const center = rect.top + rect.height / 2 - vh / 2;
      const offset = center * -this.appParallaxFloat();
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(0, ${offset}px, 0)`);
    });
  }
}
