import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

@Component({
  selector: 'app-fillout-form',
  imports: [],
  templateUrl: './fillout-form.html',
  styleUrl: './fillout-form.css',
})
export class FilloutForm implements AfterViewInit, OnDestroy {
  private readonly showThanksSignal = signal(false);
  readonly showThanks = this.showThanksSignal.asReadonly();

  private filloutFired = false;
  private messageListener?: (event: MessageEvent) => void;
  private filloutObserver?: MutationObserver;

  ngAfterViewInit(): void {
    this.setupFilloutDetection();
    this.loadFilloutScript();
  }

  ngOnDestroy(): void {
    this.filloutObserver?.disconnect();
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  closeThanks(): void {
    this.showThanksSignal.set(false);
  }

  private setupFilloutDetection(): void {
    this.messageListener = (event: MessageEvent) => {
      if (!event.data || this.filloutFired) return;
      const raw = typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
      if (/submit|complete|gracias|thank/i.test(raw)) {
        this.handleFormSubmit();
      }
    };
    window.addEventListener('message', this.messageListener);

    setTimeout(() => {
      const wrap = document.querySelector('[data-fillout-id]');
      if (!wrap) return;
      this.filloutObserver = new MutationObserver(() => {
        if (this.filloutFired) return;
        if (wrap.textContent && /gracias|thank/i.test(wrap.textContent)) {
          this.handleFormSubmit();
        }
      });
      this.filloutObserver.observe(wrap, { childList: true, subtree: true, characterData: true });
    }, 500);
  }

  private handleFormSubmit(): void {
    if (this.filloutFired) return;
    this.filloutFired = true;
    window.fbq?.('track', 'CompleteRegistration');
    this.showThanksSignal.set(true);
  }

  private loadFilloutScript(): void {
    if (document.querySelector('script[src*="fillout.com/embed"]')) return;
    const script = document.createElement('script');
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);
  }
}
