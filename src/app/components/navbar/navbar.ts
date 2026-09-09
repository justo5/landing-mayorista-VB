import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Scroll } from '../../services/scroll';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  protected readonly scroll = inject(Scroll);

  private readonly navEl = viewChild.required<ElementRef<HTMLElement>>('navEl');

  ngAfterViewInit(): void {
    // Measured once at rest (unscrolled) — the hero uses this to fill exactly
    // the viewport below the bar instead of guessing its height.
    requestAnimationFrame(() => {
      this.scroll.registerNavHeight(this.navEl().nativeElement.getBoundingClientRect().height);
    });
  }
}
