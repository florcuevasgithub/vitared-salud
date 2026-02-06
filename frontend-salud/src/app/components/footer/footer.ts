import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {
  categoriasFooter: any[] = [];
  linksApps: any;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarLinksTiendas();
    this.cargarDatosFooter();
  }

  cargarLinksTiendas() {
    this.http.get(`${this.apiUrl}/api/contenido`).subscribe({
      next: (res: any) => {
        if (res.items && res.items.length > 0) {
          this.linksApps = res.items[0].fields;
        }
      },
      error: (err) => console.error('Error cargando links de apps:', err)
    });
  }

  cargarDatosFooter() {
    this.http.get(`${this.apiUrl}/api/categorias-footer`).subscribe({
      next: (res: any) => {
        if (res.items && res.includes && res.includes.Entry) {
          this.categoriasFooter = res.items.map((cat: any) => {
            const links = cat.fields.enlaces ? cat.fields.enlaces.map((linkRef: any) => {
              const entry = res.includes.Entry.find((e: any) => e.sys.id === linkRef.sys.id);
              return entry ? { titulo: entry.fields.titulo, slug: entry.fields.slug } : null;
            }).filter((l: any) => l !== null) : [];

            return {
              titulo: cat.fields.sobreNosotros || cat.fields['Sobre nosotros'] || 'Sobre nosotros',
              enlaces: links
            };
          });
        }
      },
      error: (err) => console.error('Error cargando el Footer:', err)
    });
  }
}
