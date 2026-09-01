import { Component, signal } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [FadeIn],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly items: FaqItem[] = [
    {
      question: '¿El primer mes es realmente gratis?',
      answer:
        'Sí. Durante el primer mes están bonificados únicamente los honorarios de Vamos Bien. La inversión publicitaria se abona desde el primer día directamente a Meta y no está incluida en la bonificación.',
    },
    {
      question: '¿Cuándo hago mi primer pago?',
      answer:
        'Tu primer pago a Vamos Bien se realiza recién al comenzar el segundo mes. Antes de eso, trabajamos normalmente en tu negocio mayorista sin cobrarte honorarios.',
    },
    {
      question: '¿Por qué hay un mínimo de 6 meses?',
      answer:
        'El algoritmo de Meta necesita tiempo para aprender qué perfil de comprador mayorista convierte mejor para tus productos. Los primeros meses construimos la base y afinamos la segmentación, y los siguientes escalamos lo que mejor funciona para maximizar resultados.',
    },
    {
      question: '¿El presupuesto de los anuncios está incluido?',
      answer: 'No. Nuestro fee es por gestión y estrategia. Lo que le pagás a Meta va directo a tu cuenta. Transparencia total.',
    },
    {
      question: '¿Pueden anunciar varias líneas de productos a la vez?',
      answer:
        'Sí. Armamos campañas por producto, por categoría o por zona de venta, segmentadas para llegar al comprador mayorista que estás buscando.',
    },
    {
      question: '¿Cómo evitan que se llene de consultas de minoristas o curiosos que no compran en volumen?',
      answer:
        'Con segmentación precisa y, si sumás el Bot IA, preguntas automáticas de volumen de compra, zona y tipo de producto que filtran curiosos antes de que lleguen a tu equipo.',
    },
  ];

  private readonly openIndexSignal = signal<number | null>(0);
  readonly openIndex = this.openIndexSignal.asReadonly();

  toggle(index: number): void {
    this.openIndexSignal.set(this.openIndexSignal() === index ? null : index);
  }
}
