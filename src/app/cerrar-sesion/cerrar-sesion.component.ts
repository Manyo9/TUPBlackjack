import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SesionIniciadaService } from '../services/sesion-iniciada.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');


@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {
  constructor(private sesionService: SesionIniciadaService, private router: Router) { }

  ngOnInit(): void {
  }
  cerrarSesion(): void {

    swal({
      title: "Cerrar sesión",
      text: "¿Seguro que quiere cerrar la sesión?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      }
    })
    .then((cerrarSesion) => {
      if (cerrarSesion) {
        localStorage.removeItem('token');
        this.sesionService.cambiarEstado(false);
        this.router.navigate(['inicio']);
        swal("Hasta pronto!", {
          icon: "success",
        });
      }
    });
  }
}
