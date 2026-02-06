import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';

interface HealthStatus {
  status: string;
  message: string;
}

interface ContenidoMedico {
  id: string;
  titulo?: string;
  descripcion?: string;
  contenido?: string;
  tipo?: string;
  categoria?: string;
  metadata?: any;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

interface ContenidosResponse {
  status: string;
  total: number;
  data: ContenidoMedico[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vitared Salud';
  healthStatus: HealthStatus | null = null;
  contenidos: ContenidoMedico[] = [];
  loading = false;
  loadingContenidos = false;
  error: string | null = null;
  errorContenidos: string | null = null;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkHealth();
    this.cargarContenidos();
  }

  checkHealth(): void {
    this.loading = true;
    this.error = null;
    this.http.get<HealthStatus>(`${this.apiUrl}/api/health`)
      .subscribe({
        next: (data) => {
          this.healthStatus = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Error al conectar con el backend';
          this.healthStatus = null;
          this.loading = false;
        }
      });
  }

  cargarContenidos(): void {
    this.loadingContenidos = true;
    this.errorContenidos = null;
    this.http.get<ContenidosResponse>(`${this.apiUrl}/api/contenido`)
      .subscribe({
        next: (data) => {
          if (data.status === 'OK') {
            this.contenidos = data.data || [];
          } else {
            this.errorContenidos = data.status || 'Error al cargar contenidos';
          }
          this.loadingContenidos = false;
        },
        error: (err) => {
          this.errorContenidos = err.message || 'Error al cargar contenidos';
          this.contenidos = [];
          this.loadingContenidos = false;
        }
      });
  }

  getContenidoPreview(contenido: string | undefined): string {
    if (!contenido) return '';
    return contenido.length > 200 ? contenido.substring(0, 200) + '...' : contenido;
  }
}
