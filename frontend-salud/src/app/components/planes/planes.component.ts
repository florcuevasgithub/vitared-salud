import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../app.constants'; // <--- Importamos la constante

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 40px; font-family: sans-serif; background: #f4f7f6; min-height: 90vh;">
      </div>
  `
})
export class PlanesComponent implements OnInit {
  listaPlanes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // CAMBIO CLAVE: Usamos la URL de Railway para los planes
    this.http.get(`${environment.apiUrl}/api/planes`).subscribe({
      next: (res: any) => {
        this.listaPlanes = res.items;
      },
      error: (err) => console.error('Error cargando planes:', err)
    });
  }
}
