import { Component } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

@Component({
  selector: 'app-fit-check',
  imports: [FadeIn],
  templateUrl: './fit-check.html',
  styleUrl: './fit-check.css',
})
export class FitCheck {
  protected readonly fitFor: string[] = [
    'Vendés al por mayor.',
    'Tenés stock o catálogo activo.',
    'Querés conseguir más comercios, revendedores o distribuidores.',
    'Tenés equipo o alguien que responda WhatsApp.',
    'Podés invertir en publicidad todos los meses.',
  ];

  protected readonly notFitFor: string[] = [
    'Vendés solo minorista.',
    'No tenés margen para vender por volumen.',
    'No podés responder consultas rápido.',
    'Buscás resultados sin invertir en anuncios.',
    'Querés probar "a ver qué pasa" sin compromiso comercial.',
  ];
}
