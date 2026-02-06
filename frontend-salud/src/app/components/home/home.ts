import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  datos: any;
  imageUrl: string = '';
  empresas: any[] = [];
  apiUrl = environment.apiUrl;

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
