import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
  private recurso: string = 'usuarios'
  private apiUrl: string = `http://localhost:3000/api/${this.recurso}`;


  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<ResultadoGenerico> {
    return this.http.post<ResultadoGenerico>(`${this.apiUrl}/iniciarSesion`,usuario);
  }

}
