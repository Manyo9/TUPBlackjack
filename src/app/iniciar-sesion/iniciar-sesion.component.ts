import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
import { ResultadoGenerico } from '../models/resultado-generico';
import { Usuario } from '../models/usuario';
import { SesionIniciadaService } from '../services/sesion-iniciada.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  formulario: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usuService: UsuarioService,
    private router: Router,
    private sesionService: SesionIniciadaService
  ) {
    this.formulario = this.formBuilder.group(
      {
        usuario: [, Validators.required],
        contrasenia: [, Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  iniciarSesion(): void {

    if (this.formulario.valid) {
      let usuLogin = new Usuario();
      usuLogin = this.formulario.value as Usuario;
      this.subscription.add(
        this.usuService.inicioSesion(usuLogin).subscribe({
          next: (res: ResultadoGenerico) => {
            if (res.ok && res.resultado != null) {
              localStorage.setItem('token',res.resultado);
              swal({title:'Bienvenido/a!', icon:'success'});
              this.sesionService.cambiarEstado(true);

              this.router.navigate(['jugar']);
            } else {
              swal({title:'Error', text:`${res.mensaje}`, icon: 'error'})
            }
          },
          error: (e: any) => { 
            swal({title:'Error al iniciar sesión', text: `${e.message}`, icon: 'error'});
            console.log(e);
           }

        })
      );
    }
    else {
      swal({title:'Complete los campos', icon: 'warning'});
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}
