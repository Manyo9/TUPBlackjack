import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { Usuario } from '../models/usuario';
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
    private router: Router
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
        this.usuService.login(usuLogin).subscribe({
          next: (res: ResultadoGenerico) => {
            if (res.ok && res.resultado != null) {
              localStorage.setItem('token',res.resultado);
              alert('Bienvenido/a!');
              this.router.navigate(['jugar']);
            } else {
              alert(`Error: ${res.mensaje}`)
            }
          },
          error: (e: any) => { alert(`Error al iniciar sesión: ${e}`) }
        })
      );
    }
    else {
      alert("Complete los campos");
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}
