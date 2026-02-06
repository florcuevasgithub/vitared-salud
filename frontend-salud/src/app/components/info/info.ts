import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit {
  pagina: any;
  apiUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cargarDatos(params['slug']);
    });
  }

  cargarDatos(slug: string) {
    this.http.get(`${this.apiUrl}/api/pagina/${slug}`).subscribe({
      next: (res: any) => {
        if (res.items && res.items.length > 0) {
          this.pagina = res.items[0];
        }
      },
      error: (err) => console.error('Error cargando página:', err)
    });
  }
}
