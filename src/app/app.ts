import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { SocialRail } from './components/social-rail/social-rail';
import { Hero } from './components/hero/hero';
import { Content } from './components/content/content';
import { Oferta } from './components/oferta/oferta';
import { Pricing } from './components/pricing/pricing';
import { Testimonials } from './components/testimonials/testimonials';
import { FoundersVideo } from './components/founders-video/founders-video';
import { Faq } from './components/faq/faq';
import { FinalCta } from './components/final-cta/final-cta';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    SocialRail,
    Hero,
    Content,
    Oferta,
    Pricing,
    Testimonials,
    FoundersVideo,
    Faq,
    FinalCta,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
