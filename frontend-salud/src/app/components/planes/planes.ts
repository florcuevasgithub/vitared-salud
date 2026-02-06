import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent implements OnInit {
  listaPlanes: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${this.apiUrl}/api/planes`).subscribe({
      next: (res: any) => {
        this.listaPlanes = res.items || [];
      },
      error: (err) => console.error('Error cargando planes:', err)
    });
  }
}
