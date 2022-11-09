import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class ReporteService {
  API_URL: string = 'http://localhost:3000/api/reportes/';
  constructor(private http: HttpClient) { }
  
  obtenerIndiceResultados(): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>( this.API_URL + 'indiceResultados',requestOptions);
  }
  obtenerPromedioVeintiuno(): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>( this.API_URL + 'promedioVeintiuno',requestOptions);
  }

  obtenerCantidadVictoriasUsuario(): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>( this.API_URL + 'cantidadVictoriasUsuario',requestOptions);
  }

  obtenerCantidadJuegosJugadores(): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>( this.API_URL + 'cantidadJuegosJugadores',requestOptions);
  }
}