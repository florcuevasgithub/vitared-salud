import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../app.constants'; // <--- IMPORTANTE: Importamos la constante

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div *ngIf="datos" [style.backgroundColor]="datos.fields.heroBackgroundColor"
         style="padding: 60px 50px; color: white; display: flex; align-items: center; justify-content: center; gap: 40px; font-family: sans-serif;">
      </div>
    `
})
export class HomeComponent implements OnInit {
  datos: any;
  imageUrl: string = '';
  empresas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // 1. Cargar Banner usando la URL de Railway
    this.http.get(`${environment.apiUrl}/api/contenido`).subscribe((res: any) => {
      this.datos = res.items[0];
      if (res.includes && res.includes.Asset) {
        this.imageUrl = 'https:' + res.includes.Asset[0].fields.file.url;
      }
    });

    // 2. Cargar Empresas usando la URL de Railway
    this.http.get(`${environment.apiUrl}/api/empresas`).subscribe((res: any) => {
      if (res.items) {
        this.empresas = res.items.map((item: any) => {
          const assetId = item.fields.logo.sys.id;
          const asset = res.includes.Asset.find((a: any) => a.sys.id === assetId);
          return {
            nombre: item.fields.nombre,
            urlLogo: asset ? 'https:' + asset.fields.file.url : ''
          };
        });
      }
    });
  }
}
