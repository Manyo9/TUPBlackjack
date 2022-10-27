import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  @Input() carta: Carta;
  rutaImagen: string;
  constructor() { }

  ngOnInit(): void {
    let paloString: string;
    let valorString: string;
    switch (this.carta.palo) {
      case 1:
        paloString = 'clubs';
        break;
      case 2:
        paloString = 'hearts';
        break;
      case 3:
        paloString = 'diamonds';
        break;
      case 4:
        paloString = 'spades';
        break;
    
      default:
        paloString = '';
        break;
      }
      switch (this.carta.valorCarta) {
        case 'A':
          valorString = 'ace'
          break;
        case 'J':
          valorString = 'jack'
          break;
        case 'Q':
          valorString = 'queen'
          break;
        case 'K':
          valorString = 'king'
          break;
        default:
          valorString = this.carta.valorCarta;
          break;
      }

      if (paloString==='') {
        this.rutaImagen = 'https://raw.githubusercontent.com/Abraguas/blackjack-cartas/main/flipped.png';
      } else {
        this.rutaImagen = 'https://raw.githubusercontent.com/Abraguas/blackjack-cartas/main/'+valorString+'_of_'+paloString+'.png';
      }
    }
    //'../assets/cartas/'+valorString+'_of_'+paloString+'.png'
    
  }
