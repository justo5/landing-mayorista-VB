import { Component } from '@angular/core';
import { FilloutForm } from '../fillout-form/fillout-form';
import { FadeIn } from '../../directives/fade-in/fade-in';

@Component({
  selector: 'app-final-cta',
  imports: [FilloutForm, FadeIn],
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.css',
})
export class FinalCta {}
