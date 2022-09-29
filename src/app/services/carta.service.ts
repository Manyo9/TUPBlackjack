import { Injectable } from '@angular/core';
import { Carta } from '../models/carta';

@Injectable()
export class CartaService {

  constructor() { }
  obtenerCarta(): Carta {
    let cartaRandom: Carta;
    let palo = Math.floor(Math.random() * (4) + 1);
    let stringValor: string;
    let numValor = Math.floor(Math.random() * (13) + 1);
    switch (numValor) {
      case 11:
        stringValor = 'J';
        break;
      case 12:
        stringValor = 'Q';
        break;
      case 13:
        stringValor = 'K';
        break;
      case 1:
        stringValor = 'A';
        break;

      default:
        stringValor = numValor.toString();
        break;
    }
    cartaRandom = {
      palo: palo,
      valor: stringValor
    }
    return cartaRandom
  }
}
