import { Component, inject } from '@angular/core';
import { Scroll } from '../../services/scroll';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly scroll = inject(Scroll);
}
