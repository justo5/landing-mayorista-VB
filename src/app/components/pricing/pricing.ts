import { Component } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  description: string;
  features: PricingFeature[];
  featured: boolean;
  badge?: string;
}

@Component({
  selector: 'app-pricing',
  imports: [FadeIn],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  protected readonly plans: PricingPlan[] = [
    {
      name: 'Plan Focus',
      tagline: 'Solo gestión',
      price: '350',
      description:
        'Tenés fotos y videos de tus productos. Nosotros ponemos la estrategia y optimizamos cada peso en Meta para generar pedidos calificados.',
      featured: true,
      badge: 'Más elegido',
      features: [
        { label: 'Gestión Meta Ads', included: true },
        { label: 'Plan del mes', included: true },
        { label: 'Soporte WhatsApp', included: true },
        { label: 'Creatividades para anuncios', included: false },
        { label: 'Bot IA WhatsApp', included: false },
      ],
    },
    {
      name: 'Plan Creativo',
      tagline: 'Gestión + creatividades',
      price: '490',
      description:
        'No tenés tiempo para armar piezas de cada producto o catálogo. Nosotros creamos los anuncios —fotos, carruseles y videos— y los gestionamos. Vos solo recibís pedidos.',
      featured: false,
      features: [
        { label: 'Gestión Meta Ads', included: true },
        { label: 'Plan del mes', included: true },
        { label: 'Soporte WhatsApp', included: true },
        { label: 'Creatividades para anuncios', included: true },
        { label: 'Bot IA WhatsApp', included: false },
      ],
    },
  ];
}
