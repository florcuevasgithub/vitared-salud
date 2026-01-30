import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 40px; font-family: sans-serif; background: #f4f7f6; min-height: 90vh;">
      <h2 style="text-align: center; color: #005AAB; font-size: 2.5rem; margin-bottom: 40px;">Nuestros Planes Médicos</h2>

      <div style="display: flex; gap: 25px; justify-content: center; flex-wrap: wrap;">
        <div *ngFor="let plan of listaPlanes"
             style="background: white; border-radius: 20px; padding: 30px; width: 300px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 8px solid #005AAB;">

          <h3 style="color: #005AAB; font-size: 1.8rem; margin: 0;">{{ plan.fields.nombre }}</h3>

          <div style="margin: 20px 0;">
            <span style="font-size: 2.5rem; font-weight: bold; color: #333;">$ {{ plan.fields.precio }}</span>
            <span style="color: #888;"> / mes</span>
          </div>

          <p style="font-weight: bold; color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px;">Beneficios:</p>

          <ul style="list-style: none; padding: 0; margin: 0;">
            <li *ngFor="let item of plan.fields.beneficios.split(',')"
                style="margin-bottom: 12px; color: #555; display: flex; align-items: flex-start;">
              <span style="color: #28a745; margin-right: 10px; font-weight: bold;">✓</span>
              {{ item.trim() }}
            </li>
          </ul>

          <button style="margin-top: 30px; width: 100%; padding: 15px; background: #005AAB; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold;">
            ¡Me interesa!
          </button>
        </div>
      </div>
    </div>
  `
})
export class PlanesComponent implements OnInit {
  listaPlanes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Pedimos los datos al nuevo endpoint de Java
    this.http.get('http://localhost:8080/api/planes').subscribe({
      next: (res: any) => {
        this.listaPlanes = res.items;
      },
      error: (err) => console.error('Error cargando planes:', err)
    });
  }
}
