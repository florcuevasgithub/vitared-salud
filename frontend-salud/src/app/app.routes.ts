import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cartilla',
    loadComponent: () => import('./components/cartilla/cartilla.component').then(m => m.CartillaComponent)
  },
  {
    path: 'planes',
    loadComponent: () => import('./components/planes/planes.component').then(m => m.PlanesComponent)
  },
  {
    path: 'info/:slug',
    // IMPORTANTE: Aquí usamos el nuevo nombre info.component
    loadComponent: () => import('./components/info/info.component').then(m => m.InfoComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
