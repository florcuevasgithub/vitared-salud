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
    this.cargarBanner();
    this.cargarEmpresas();
  }

  cargarBanner() {
    // Intentar cargar desde Contentful (formato items) o desde nuestro backend (formato data)
    this.http.get(`${this.apiUrl}/api/contenido`).subscribe({
      next: (res: any) => {
        // Formato Contentful directo
        if (res.items && res.items.length > 0) {
          this.datos = res.items[0];
          if (res.includes && res.includes.Asset) {
            this.imageUrl = 'https:' + res.includes.Asset[0].fields.file.url;
          }
        }
        // Formato de nuestro backend
        else if (res.data && res.data.length > 0) {
          this.datos = {
            fields: {
              heroTitle: res.data[0].titulo || 'Bienvenido a Vitared Salud',
              heroSubtitle: res.data[0].descripcion || 'Tu salud, nuestra prioridad',
              heroCtaButtonText: 'Conocé más',
              heroBackgroundColor: '#005AAB'
            }
          };
        }
        // Si no hay datos, usar valores por defecto
        else {
          this.datos = {
            fields: {
              heroTitle: '¡Conocé los increíbles beneficios de ser parte de Vitared Salud!',
              heroSubtitle: 'Tu salud es nuestra prioridad. Descubrí nuestros planes y servicios.',
              heroCtaButtonText: 'Conocé más',
              heroBackgroundColor: '#005AAB'
            }
          };
        }
      },
      error: (err) => {
        console.error('Error cargando banner:', err);
        // Valores por defecto si falla
        this.datos = {
          fields: {
            heroTitle: '¡Conocé los increíbles beneficios de ser parte de Vitared Salud!',
            heroSubtitle: 'Tu salud es nuestra prioridad. Descubrí nuestros planes y servicios.',
            heroCtaButtonText: 'Conocé más',
            heroBackgroundColor: '#005AAB'
          }
        };
      }
    });
  }

  cargarEmpresas() {
    this.http.get(`${this.apiUrl}/api/empresas`).subscribe({
      next: (res: any) => {
        if (res.items) {
          // Formato Contentful
          this.empresas = res.items.map((item: any) => {
            const assetId = item.fields.logo?.sys?.id;
            const asset = res.includes?.Asset?.find((a: any) => a.sys.id === assetId);
            return {
              nombre: item.fields.nombre,
              urlLogo: asset ? 'https:' + asset.fields.file.url : ''
            };
          });
        } else if (res.data) {
          // Formato de nuestro backend
          this.empresas = res.data.map((item: any) => ({
            nombre: item.nombre || item.titulo,
            urlLogo: item.logo || item.imagen || ''
          }));
        }
      },
      error: (err) => {
        console.error('Error cargando empresas:', err);
        // Empresas por defecto vacías
        this.empresas = [];
      }
    });
  }
}
