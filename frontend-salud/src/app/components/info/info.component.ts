import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../app.constants';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 60px 20px; font-family: sans-serif; min-height: 70vh; background: #fff;">

      <div *ngIf="pagina; else esperaCarga" style="max-width: 900px; margin: 0 auto;">

        <p style="color: #005AAB; font-weight: bold; text-transform: uppercase; font-size: 0.85rem; margin-bottom: 10px;">
          Sobre nosotros
        </p>

        <h1 style="color: #002855; font-size: 2.8rem; margin-bottom: 20px; font-weight: bold;">
          {{ pagina.fields.titulo }}
        </h1>

        <div style="width: 50px; height: 4px; background: #005AAB; margin-bottom: 40px;"></div>

        <div style="line-height: 1.8; color: #444; font-size: 1.15rem; white-space: pre-wrap;">
          {{ pagina.fields.contenido }}
        </div>
      </div>

      <ng-template #esperaCarga>
        <div style="text-align: center; padding: 100px;">
          <p style="color: #666; font-size: 1.1rem;">Cargando información de VITARED SALUD...</p>
        </div>
      </ng-template>

    </div>
  `
})
export class InfoComponent implements OnInit {
  pagina: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.cargarDatos(params['slug']);
      }
    });
  }

  cargarDatos(slug: string) {
    this.http.get(`${environment.apiUrl}/api/pagina/${slug}`).subscribe({
      next: (res: any) => {
        if (res.items && res.items.length > 0) {
          this.pagina = res.items[0];
        }
      },
      error: (err) => console.error('Error cargando página:', err)
    });
  }
}
