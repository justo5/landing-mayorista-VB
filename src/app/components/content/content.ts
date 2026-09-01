import { AfterViewInit, Component, ElementRef, inject, viewChildren } from '@angular/core';
import { FeatureBlock } from '../feature-block/feature-block';
import { Scroll } from '../../services/scroll';

@Component({
  selector: 'app-content',
  imports: [FeatureBlock],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements AfterViewInit {
  private readonly scroll = inject(Scroll);

  private readonly blocks = viewChildren(FeatureBlock, { read: ElementRef<HTMLElement> });

  ngAfterViewInit(): void {
    this.scroll.registerSections(this.blocks().map((block) => block.nativeElement));
  }
}
