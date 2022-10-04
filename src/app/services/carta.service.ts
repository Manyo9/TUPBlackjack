import { Injectable } from '@angular/core';
import { Carta } from '../models/carta';

@Injectable()
export class CartaService {

  constructor() { }
  obtenerCartaAleatoria(): Carta {
    let cartaRandom: Carta;
    let palo = Math.floor(Math.random() * (4) + 1);
    let stringValor: string;
    let puntosCarta: number;
    let numValor = Math.floor(Math.random() * (13) + 1);
    switch (numValor) {
      case 11:
        stringValor = 'J';
        puntosCarta = 10;
        break;
      case 12:
        stringValor = 'Q';
        puntosCarta = 10;
        break;
      case 13:
        stringValor = 'K';
        puntosCarta = 10;
        break;
      case 1:
        stringValor = 'A';
        puntosCarta = 11;
        break;

      default:
        stringValor = numValor.toString();
        puntosCarta = numValor;
        break;
    }
    cartaRandom = {
      palo: palo,
      valorCarta: stringValor,
      valorNumerico: puntosCarta
    }
    return cartaRandom
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
