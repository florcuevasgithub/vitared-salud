import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuItems = [
    { label: 'Inicio', link: '/', active: true },
    { label: 'Salud', link: '/salud' },
    { label: 'Contenidos', link: '/contenidos' },
    { label: 'Nosotros', link: '/nosotros' },
    { label: 'Contacto', link: '/contacto' }
  ];
}
