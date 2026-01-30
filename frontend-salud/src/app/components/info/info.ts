import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../app.constants'; // <--- Importamos la constante

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 60px 20px; font-family: sans-serif; min-height: 70vh; background: #fff;">
      <div *ngIf="pagina; else loading" style="max-width: 900px; margin: 0 auto;">
        </div>
      </div>
  `
})
export class InfoComponent implements OnInit {
  pagina: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cargarDatos(params['slug']);
    });
  }

  cargarDatos(slug: string) {
    // CAMBIO CLAVE: Usamos la URL de Railway + el slug dinámico
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
