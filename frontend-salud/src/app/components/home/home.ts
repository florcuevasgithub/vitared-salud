import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div *ngIf="datos" [style.backgroundColor]="datos.fields.heroBackgroundColor"
         style="padding: 60px 50px; color: white; display: flex; align-items: center; justify-content: center; gap: 40px; font-family: sans-serif;">

      <div style="max-width: 500px; text-align: left;">
        <h1 style="font-size: 2.8rem; margin-bottom: 20px; line-height: 1.1;">{{ datos.fields.heroTitle }}</h1>
        <p style="font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9;">{{ datos.fields.heroSubtitle }}</p>
        <button style="padding: 15px 30px; cursor: pointer; border-radius: 8px; border: none; background: white; color: #005AAB; font-weight: bold; font-size: 1rem;">
          {{ datos.fields.heroCtaButtonText }}
        </button>
      </div>

      <div *ngIf="imageUrl">
         <img [src]="imageUrl" style="max-width: 450px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
      </div>
    </div>

    <div style="padding: 80px 0; background: #fff; text-align: center; font-family: sans-serif;">
      <h2 style="color: #333; margin-bottom: 10px; font-size: 1.8rem;">
        Empresas que integran <span style="color: #005AAB; font-weight: bold;">VITARED SALUD</span>
      </h2>
      <p style="color: #666; margin-bottom: 50px;">Disfrutá los beneficios de ser parte de nuestra red.</p>

      <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div *ngFor="let emp of empresas"
             style="background: #f8f9fa; padding: 25px; border-radius: 15px; border: 1px solid #eee; width: 200px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <div style="height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <img [src]="emp.urlLogo" [alt]="emp.nombre" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.9rem; color: #555; font-weight: 600;">{{ emp.nombre }}</span>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  datos: any;
  imageUrl: string = '';
  empresas: any[] = [];
  apiUrl = 'https://backend-salud-lhq8.onrender.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargar Banner
    this.http.get(`${this.apiUrl}/api/contenido`).subscribe((res: any) => {
      if (res.items && res.items.length > 0) {
        this.datos = res.items[0];
        if (res.includes && res.includes.Asset) {
          this.imageUrl = 'https:' + res.includes.Asset[0].fields.file.url;
        }
      }
    });

    // Cargar Empresas
    this.http.get(`${this.apiUrl}/api/empresas`).subscribe((res: any) => {
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
