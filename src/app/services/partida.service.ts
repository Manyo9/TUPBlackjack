import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class PartidaService {
  API_URL: string = 'http://localhost:3000/api/partidas/';
  constructor(private http: HttpClient) { }
  
  empezarPartida(): Observable<ResultadoGenerico> {

    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });

 

    const requestOptions = { headers: headers };
    return this.http.post<ResultadoGenerico>(this.API_URL + "nueva", null, requestOptions);
  }
}
