import { Component, input } from '@angular/core';
import { ParallaxFloat } from '../../directives/parallax-float/parallax-float';
import { FadeIn } from '../../directives/fade-in/fade-in';

export type FeatureBlockImageSide = 'left' | 'right';

@Component({
  selector: 'app-feature-block',
  imports: [ParallaxFloat, FadeIn],
  templateUrl: './feature-block.html',
  styleUrl: './feature-block.css',
})
export class FeatureBlock {
  readonly sectionId = input.required<string>();
  readonly number = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly imageSrc = input.required<string>();
  readonly imageAlt = input.required<string>();
  readonly imageSide = input<FeatureBlockImageSide>('right');
  readonly imageHeight = input('440px');
  readonly paddingTop = input('70px');
  readonly paddingBottom = input('130px');
}
