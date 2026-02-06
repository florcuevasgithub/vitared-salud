import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  footerLinks = {
    empresa: [
      { label: 'Nosotros', link: '/nosotros' },
      { label: 'Misión y Visión', link: '/mision-vision' },
      { label: 'Sustentabilidad', link: '/sustentabilidad' }
    ],
    servicios: [
      { label: 'Salud', link: '/salud' },
      { label: 'Contenidos Médicos', link: '/contenidos' },
      { label: 'Recursos', link: '/recursos' }
    ],
    contacto: [
      { label: 'Contacto', link: '/contacto' },
      { label: 'Soporte', link: '/soporte' },
      { label: 'Preguntas Frecuentes', link: '/faq' }
    ]
  };
}
