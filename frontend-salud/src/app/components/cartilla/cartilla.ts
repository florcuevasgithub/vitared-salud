import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cartilla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartilla.html',
  styleUrls: ['./cartilla.css']
})
export class CartillaComponent implements OnInit {
  listaMedicos: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${this.apiUrl}/api/cartilla`).subscribe({
      next: (res: any) => {
        this.listaMedicos = res.items || [];
      },
      error: (err) => console.error('Error cargando cartilla:', err)
    });
  }
}
