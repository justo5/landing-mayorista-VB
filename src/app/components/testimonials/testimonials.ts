import { Component } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

interface Review {
  name: string;
  initials: string;
  quote: string;
  timeAgo: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [FadeIn],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  // TODO: placeholders — reemplazar por reseñas reales de clientes mayoristas apenas estén disponibles.
  protected readonly reviews: Review[] = [
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: contanos cómo cambió tu volumen de pedidos desde que trabajás con nosotros.',
      timeAgo: 'Hace 4 semanas',
    },
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: destacá la atención y el seguimiento del equipo.',
      timeAgo: 'Hace 2 semanas',
    },
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: mencioná resultados concretos en captación de nuevos compradores.',
      timeAgo: 'Hace 2 meses',
    },
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: contanos hace cuánto trabajás con nosotros y qué cambió.',
      timeAgo: 'Hace 7 meses',
    },
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: resaltá la proactividad y el compromiso del equipo.',
      timeAgo: 'Hace 7 meses',
    },
    {
      name: 'Cliente mayorista',
      initials: 'CM',
      quote: 'Ejemplo de reseña: contanos cómo ayudamos a potenciar tu marca y tus ventas.',
      timeAgo: 'Hace 9 meses',
    },
  ];
}
