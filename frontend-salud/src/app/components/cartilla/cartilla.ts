import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartilla',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 40px; font-family: sans-serif; background: #f4f7f6; min-height: 90vh;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="color: #005AAB; font-size: 2rem; border-bottom: 2px solid #005AAB; padding-bottom: 10px; margin-bottom: 30px;">
          Cartilla Médica
        </h2>

        <div *ngIf="listaMedicos.length > 0; else noData" style="display: flex; flex-direction: column; gap: 15px;">
          <div *ngFor="let medico of listaMedicos"
               style="background: white; border-radius: 10px; padding: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

            <div>
              <h3 style="margin: 0; color: #333; font-size: 1.2rem;">{{ medico.fields.nombre }}</h3>
              <p style="margin: 5px 0; color: #005AAB; font-weight: bold; font-size: 0.9rem; text-transform: uppercase;">
                {{ medico.fields.especialidad }}
              </p>
              <p style="margin: 0; color: #666; font-size: 0.9rem;">
                📍 {{ medico.fields.direccion }}
              </p>
            </div>

            <button style="background: transparent; border: 1px solid #005AAB; color: #005AAB; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
              Ver Disponibilidad
            </button>
          </div>
        </div>

        <ng-template #noData>
          <div style="text-align: center; padding: 50px; color: #888;">
            <p>No se encontraron profesionales en la cartilla médica.</p>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class CartillaComponent implements OnInit {
  listaMedicos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Llamamos al nuevo puerto que creamos en Java
    this.http.get('http://localhost:8080/api/cartilla').subscribe({
      next: (res: any) => {
        this.listaMedicos = res.items;
      },
      error: (err) => console.error('Error cargando cartilla:', err)
    });
  }
}
