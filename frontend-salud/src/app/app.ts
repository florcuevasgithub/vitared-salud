import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { environment } from '../environments/environment'; // Verificá que esta ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavbarComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>

    <main style="min-height: 80vh;">
      <router-outlet></router-outlet>
    </main>

    <footer style="background: #002855; color: white; padding: 60px 50px; font-family: sans-serif;">
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 40px; max-width: 1200px; margin: 0 auto;">
        <div *ngFor="let cat of categoriasFooter" style="min-width: 180px;">
          <h4 style="margin-bottom: 20px; font-size: 1.1rem; color: #fff; text-transform: uppercase;">{{ cat.titulo }}</h4>
          <ul style="list-style: none; padding: 0; font-size: 0.9rem; line-height: 2;">
            <li *ngFor="let link of cat.enlaces">
              <a [routerLink]="['/info', link.slug]" style="color: rgba(255,255,255,0.7); text-decoration: none;">{{ link.titulo }}</a>
            </li>
          </ul>
        </div>
        <div style="min-width: 220px;">
          <h4 style="margin-bottom: 20px;">Descargá nuestra APP</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
             <a *ngIf="linksApps?.appStoreLink" [href]="linksApps.appStoreLink" target="_blank">
               <button style="background: black; color: white; padding: 10px; border-radius: 5px; cursor: pointer;">App Store</button>
             </a>
             <a *ngIf="linksApps?.googlePlayLink" [href]="linksApps.googlePlayLink" target="_blank">
               <button style="background: black; color: white; padding: 10px; border-radius: 5px; cursor: pointer;">Google Play</button>
             </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
  categoriasFooter: any[] = [];
  linksApps: any;

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit() {
    this.cargarLinksTiendas();
    this.cargarDatosFooter();
  }

  cargarLinksTiendas() {
    // Usamos environment.apiUrl para evitar el error de localhost
    this.http.get(`${environment.apiUrl}/api/banner`).subscribe({
      next: (res: any) => {
        if (res.items && res.items.length > 0) this.linksApps = res.items[0].fields;
      },
      error: (err) => console.error('Error Banner:', err)
    });
  }

  cargarDatosFooter() {
    // IMPORTANTE: Usar environment.apiUrl, NO "http://localhost:8080"
    this.http.get(`${environment.apiUrl}/api/categorias-footer`).subscribe({
      next: (res: any) => {
        if (res.items && res.includes) {
          this.categoriasFooter = res.items.map((cat: any) => ({
            titulo: cat.fields.titulo || 'Menú',
            enlaces: cat.fields.enlaces ? cat.fields.enlaces.map((linkRef: any) => {
              const entry = res.includes.Entry.find((e: any) => e.sys.id === linkRef.sys.id);
              return entry ? { titulo: entry.fields.titulo, slug: entry.fields.slug } : null;
            }).filter((l: any) => l !== null) : []
          }));
        }
      },
      error: (err) => console.error('Error cargando el Footer:', err)
    });
  }
}
