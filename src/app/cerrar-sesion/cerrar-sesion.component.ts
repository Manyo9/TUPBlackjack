import { Component, OnInit} from '@angular/core';
import { SesionIniciadaService } from '../services/sesion-iniciada.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {
  constructor(private sesionService: SesionIniciadaService) { }

  ngOnInit(): void {
  }
  cerrarSesion(): void {
    if (confirm("¿Seguro desea cerrar la sesión?")){
      localStorage.removeItem('token');
      this.sesionService.cambiarEstado(false);
    }

  }
}
