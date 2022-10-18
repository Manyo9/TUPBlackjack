import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class CartaService {
  API_URL: string = 'http://localhost:3000/api/partidas/';
  constructor(
    private http: HttpClient
  ) { }

  obtenerCarta(id: number): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>( `${this.API_URL}${id}/pedirCarta`,requestOptions);
  }
  obtenerDadaVuelta(): Carta {
    let carta: Carta;
    carta = {
      palo: 0,
      valorCarta: "0",
      valorNumerico: 0
    }
    return carta;
  }
  jugadaCroupier(id: number): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };


    return this.http.get<ResultadoGenerico>(`${this.API_URL}${id}/jugadaCroupier`,requestOptions);
  }
  primeraCartaCroupier(id: number): Observable<ResultadoGenerico> {
    
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.get<ResultadoGenerico>( `${this.API_URL}${id}/primeraCartaCroupier`,requestOptions);
  }
}
