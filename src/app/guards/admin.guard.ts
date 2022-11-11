import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private servicioUsuario: UsuarioService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      {
        let token = localStorage.getItem('token');
        if(token){
          let body = token.split('.')[1];       
          // let buff = Buffer.from(body, 'base64').toString('binary');
          let buff = JSON.parse(atob(body));
          console.log(buff)
          if(buff.rol== 'admin'){
            return true;
          }
        swal({title:'ERROR!', text: 'No tienes permisos para acceder a este sitio', icon: 'error'});
        return this.router.navigate(['/inicio']).then(() => false);
        }
        return false;
    }
  }
  
}
