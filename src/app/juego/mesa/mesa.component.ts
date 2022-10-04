import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  cartas: Carta[] = [];
  jugadaJugador : Carta [] = [];
  jugadaCroupier : Carta []= [];
  empezo : boolean = false;
  constructor(private cartaService: CartaService) { }

  ngOnInit(): void {


  }
  private agregarCarta(valor : boolean): void {
    if(valor){
      this.jugadaJugador.push(this.cartaService.obtenerCarta());
    }else {
      this.jugadaCroupier.push(this.cartaService.obtenerCarta());
    }
  }

  repartir () : void {
    this.agregarCarta(true);
    this.agregarCarta(true);
    this.agregarCarta(false);
    this.empezo=true;
  }
}
