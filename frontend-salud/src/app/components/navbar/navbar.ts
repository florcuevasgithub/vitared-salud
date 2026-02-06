import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav style="display: flex; justify-content: space-between; align-items: center; padding: 15px 50px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-family: sans-serif;">
      <div routerLink="/" style="color: #005AAB; font-weight: bold; font-size: 1.5rem; cursor: pointer;">
        VITARED SALUD
      </div>
      <ul style="display: flex; list-style: none; gap: 30px; margin: 0; padding: 0;">
        <li><a routerLink="/" style="text-decoration: none; color: #333; cursor: pointer;">Inicio</a></li>
        <li><a routerLink="/cartilla" style="text-decoration: none; color: #333; cursor: pointer;">Cartilla</a></li>
        <li><a routerLink="/planes" style="text-decoration: none; color: #333; cursor: pointer;">Planes</a></li>
      </ul>
      <button style="background: #005AAB; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
        Mi Portal
      </button>
    </nav>
  `
})
export class NavbarComponent {}
