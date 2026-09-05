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
  // Reseñas reales de Google de Vamos Bien Marketing Digital. Se priorizaron las que no
  // delatan el rubro del cliente (se descartó, por ejemplo, una de una clínica de estética).
  protected readonly reviews: Review[] = [
    {
      name: 'Sebastian Estevez',
      initials: 'SE',
      quote:
        'Excelente experiencia y resultados reales. Se nota que saben lo que hacen: entienden el negocio, escuchan de verdad y no aplican recetas genéricas. El equipo es claro, transparente y muy profesional. No prometen magia, pero sí trabajo serio y resultados concretos.',
      timeAgo: 'Hace 2 meses',
    },
    {
      name: 'Lucía Lasala',
      initials: 'LL',
      quote:
        'Queremos agradecer a todo el equipo de Vamos Bien, especialmente a Bautista Di Cesare. Su compromiso y profesionalismo marcaron una gran diferencia en nuestra marca. Estamos muy contentos con los resultados. ¡Recomendamos 100%!',
      timeAgo: 'Hace 2 meses',
    },
    {
      name: 'Gonzalo Quiroz',
      initials: 'GQ',
      quote:
        'Quiero agradecer a los chicos de Vamos Bien, en este caso a Jerónimo. Excelente trabajo con mucha dedicación y atención en cada detalle. Los super recomiendo. Te llevan el emprendimiento a otro nivel.',
      timeAgo: 'Hace 2 meses',
    },
    {
      name: 'Alejandro Bessero',
      initials: 'AB',
      quote:
        'Hace más de un año que trabajo con el equipo de Vamos Bien. Son excelentes y mi asesor Pedro Barbieri siempre dispuesto a resolver lo que sea. Me cambió la vida por completo. Los recomiendo al 100%.',
      timeAgo: 'Hace 2 meses',
    },
    {
      name: 'Tecnosol Uruguay',
      initials: 'TU',
      quote:
        'Excelente opción para trabajar a distancia. Tuvimos una reunión por Zoom, les pasé mi idea y comenzamos a trabajar. Al poco tiempo comenzaron los resultados. Los recomiendo totalmente.',
      timeAgo: 'Hace 2 meses',
    },
  ];
}
