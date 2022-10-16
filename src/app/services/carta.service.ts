import { HttpClient } from '@angular/common/http';
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

  // obtenerCartaAleatoria(): Carta {
  //   let cartaRandom: Carta;
  //   let palo = Math.floor(Math.random() * (4) + 1);
  //   let stringValor: string;
  //   let puntosCarta: number;
  //   let numValor = Math.floor(Math.random() * (13) + 1);
  //   switch (numValor) {
  //     case 11:
  //       stringValor = 'J';
  //       puntosCarta = 10;
  //       break;
  //     case 12:
  //       stringValor = 'Q';
  //       puntosCarta = 10;
  //       break;
  //     case 13:
  //       stringValor = 'K';
  //       puntosCarta = 10;
  //       break;
  //     case 1:
  //       stringValor = 'A';
  //       puntosCarta = 11;
  //       break;

  //     default:
  //       stringValor = numValor.toString();
  //       puntosCarta = numValor;
  //       break;
  //   }
  //   cartaRandom = {
  //     palo: palo,
  //     valorCarta: stringValor,
  //     valorNumerico: puntosCarta
  //   }
  //   return cartaRandom
  // }
  obtenerCarta(id: number): Observable<ResultadoGenerico> {
    return this.http.get<ResultadoGenerico>( `${this.API_URL}${id}/pedirCarta`);
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
}
