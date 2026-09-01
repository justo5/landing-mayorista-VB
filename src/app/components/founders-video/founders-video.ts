import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

@Component({
  selector: 'app-founders-video',
  imports: [FadeIn],
  templateUrl: './founders-video.html',
  styleUrl: './founders-video.css',
})
export class FoundersVideo {
  private readonly videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('videoRef');

  private readonly isPlayingSignal = signal(false);
  readonly isPlaying = this.isPlayingSignal.asReadonly();

  togglePlay(): void {
    const video = this.videoRef().nativeElement;
    if (video.paused) {
      video.play().then(() => this.isPlayingSignal.set(true));
    } else {
      video.pause();
      this.isPlayingSignal.set(false);
    }
  }

  onVideoEnded(): void {
    this.isPlayingSignal.set(false);
  }
}
