import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {
  @Output() onCerrarSesion = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }
  cerrarSesion(): void {
    if (confirm("¿Seguro desea cerrar la sesión?")){
      localStorage.removeItem('token');
      this.onCerrarSesion.emit(); 
    }

  }
}
