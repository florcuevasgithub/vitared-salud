import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { InfoComponent } from './components/info/info.component';

// IMPORTANTE: Asegúrate de que las rutas a continuación sean las correctas
// según la ubicación real de tus archivos de Planes y Cartilla
import { PlanesComponent } from './components/planes/planes';
import { CartillaComponent } from './components/cartilla/cartilla';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info/:slug', component: InfoComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'cartilla', component: CartillaComponent },
];
