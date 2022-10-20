import { Component, OnInit } from '@angular/core';
import { SesionIniciadaService } from '../services/sesion-iniciada.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sesionIniciada: boolean;
  constructor(private sesionService: SesionIniciadaService) { }

  ngOnInit(): void {
    this.sesionService.sesionCambio().subscribe({
      next: (valor: boolean) => {
        this.sesionIniciada = valor;
      }
    })
  }
}
