import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private servicioUsuario: UsuarioService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      {
        let token = localStorage.getItem('token');
        if(token){
          return true;
        }
        swal({title:'ERROR!', text: 'Debes iniciar sesión para acceder a este sitio', icon: 'error'});
        return this.router.navigate(['/iniciar-sesion']).then(() => false);
    }
  }
  
}
