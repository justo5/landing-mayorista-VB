import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Scroll } from '../../services/scroll';

interface CasoExito {
  src: string;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  protected readonly scroll = inject(Scroll);
  private readonly renderer = inject(Renderer2);

  private readonly heroSection = viewChild.required<ElementRef<HTMLElement>>('heroSection');
  private readonly backdrop = viewChild.required<ElementRef<HTMLElement>>('backdrop');
  private readonly scrim = viewChild.required<ElementRef<HTMLElement>>('scrim');
  private readonly copyLayer = viewChild.required<ElementRef<HTMLElement>>('copyLayer');

  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly cards = viewChildren<ElementRef<HTMLElement>>('card');
  private readonly casoVideos = viewChildren<ElementRef<HTMLVideoElement>>('casoVideo');

  protected readonly casos: CasoExito[] = [
    { src: '/resources/instagram_C-v5t9iJkxt.mp4' },
    { src: '/resources/instagram_DNRl47aBOkX.mp4' },
    { src: '/resources/instagram_Cx6LkvqLo96.mp4' },
    { src: '/resources/instagram_DW473LcDHP5.mp4' },
    { src: '/resources/instagram_DXYD9V3DHag.mp4' },
    { src: '/resources/instagram_DYDNHqZuo-c.mp4' },
  ];

  protected readonly activeCaso = signal(0);
  protected readonly playingCaso = signal(-1);
  protected readonly trackOffset = signal(0);

  private intersectionObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private copyLayerResizeObserver?: ResizeObserver;
  private readonly onWindowResize = (): void => this.updateHeroHeight();

  constructor() {
    effect(() => {
      const blur = this.scroll.backdropBlurPx();
      const saturate = this.scroll.backdropSaturate();
      this.renderer.setStyle(this.backdrop().nativeElement, 'filter', `blur(${blur}px) saturate(${saturate})`);
      this.renderer.setStyle(this.scrim().nativeElement, 'background', this.scroll.scrimGradient());
    });
  }

  ngAfterViewInit(): void {
    this.scroll.registerHero(this.heroSection().nativeElement);

    this.setupIntersectionObserver();
    this.setupResizeObserver();
    window.addEventListener('resize', this.onWindowResize);
    requestAnimationFrame(() => {
      this.updateTrackOffset();
      this.updateHeroHeight();
      this.playActiveCasoMuted();
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.copyLayerResizeObserver?.disconnect();
    window.removeEventListener('resize', this.onWindowResize);
  }

  protected prevCaso(): void {
    const next = (this.activeCaso() - 1 + this.casos.length) % this.casos.length;
    this.goToCaso(next);
  }

  protected nextCaso(): void {
    const next = (this.activeCaso() + 1) % this.casos.length;
    this.goToCaso(next);
  }

  protected goToCaso(index: number): void {
    if (index === this.activeCaso()) return;
    this.activeCaso.set(index);
    this.pauseAllCasoVideos();
    queueMicrotask(() => {
      this.updateTrackOffset();
      this.playActiveCasoMuted();
    });
  }

  protected toggleCasoPlay(index: number, event: Event): void {
    event.stopPropagation();
    if (index !== this.activeCaso()) {
      this.goToCaso(index);
      return;
    }
    const video = this.casoVideos()[index]?.nativeElement;
    if (!video) return;
    if (this.playingCaso() === index) {
      video.pause();
      this.playingCaso.set(-1);
      return;
    }
    video.muted = false;
    video
      .play()
      .then(() => this.playingCaso.set(index))
      .catch(() => {
        video.muted = true;
        video
          .play()
          .then(() => this.playingCaso.set(index))
          .catch(() => {});
      });
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const index = this.casoVideos().findIndex((ref) => ref.nativeElement === video);
          if (!entry.isIntersecting) {
            video.pause();
            if (index === this.playingCaso()) this.playingCaso.set(-1);
          } else if (index === this.activeCaso() && this.playingCaso() === -1) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.1 },
    );

    this.casoVideos().forEach((ref) => this.intersectionObserver!.observe(ref.nativeElement));
  }

  private setupResizeObserver(): void {
    const viewport = this.viewport()?.nativeElement;
    if (viewport && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateTrackOffset());
      this.resizeObserver.observe(viewport);
    }

    if (typeof ResizeObserver === 'undefined') return;
    this.copyLayerResizeObserver = new ResizeObserver(() => this.updateHeroHeight());
    this.copyLayerResizeObserver.observe(this.copyLayer().nativeElement);
  }

  /** The copy layer is absolutely positioned, so it can't grow `.hero` on its own — size the section to fit it so stacked mobile content (incl. the testimonial videos) never gets clipped by `overflow: hidden`. */
  private updateHeroHeight(): void {
    const hero = this.heroSection().nativeElement;
    const layer = this.copyLayer().nativeElement;
    const topOffsetPx = window.innerHeight * 0.19;
    const requiredHeight = topOffsetPx + layer.scrollHeight + 40;
    const minHeight = window.innerHeight * 1.15;
    this.renderer.setStyle(hero, 'height', `${Math.max(requiredHeight, minHeight)}px`);
  }

  private updateTrackOffset(): void {
    const card = this.cards()[this.activeCaso()]?.nativeElement;
    const viewport = this.viewport()?.nativeElement;
    if (!card || !viewport) return;
    const viewportWidth = viewport.clientWidth;
    this.trackOffset.set(viewportWidth / 2 - card.offsetLeft - card.offsetWidth / 2);
  }

  private playActiveCasoMuted(): void {
    const video = this.casoVideos()[this.activeCaso()]?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }

  private pauseAllCasoVideos(): void {
    this.casoVideos().forEach((ref) => {
      ref.nativeElement.pause();
      ref.nativeElement.muted = true;
      ref.nativeElement.currentTime = 0;
    });
    this.playingCaso.set(-1);
  }
}
