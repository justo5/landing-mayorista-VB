import { Component } from '@angular/core';
import { FadeIn } from '../../directives/fade-in/fade-in';

@Component({
  selector: 'app-oferta',
  imports: [FadeIn],
  templateUrl: './oferta.html',
  styleUrl: './oferta.css',
})
export class Oferta {
  protected readonly included: string[] = [
    'Analizamos tu negocio mayorista',
    'Definimos un foco comercial: rubro y zonas de venta',
    'Creamos tu Plan del Mes',
    'Configuramos o revisamos la cuenta publicitaria',
    'Ponemos en marcha las campañas',
    'Comenzamos a medir y optimizar',
    'Analizamos la calidad de los pedidos',
    'Revisamos el proceso comercial por WhatsApp',
  ];
}
