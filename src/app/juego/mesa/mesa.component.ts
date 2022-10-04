import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  jugadaJugador : Carta [] = [];
  jugadaCroupier : Carta [] = [];
  puntajeJugador: number = 0;
  puntajeCroupier: number = 0;
  empezo : boolean = false;
  perdio : boolean = false;
  terminoJugada : boolean = false;
  constructor(private cartaService: CartaService) { }

  ngOnInit(): void {
  }

  private actualizarPuntajes(): void {
    this.puntajeJugador = this.calcularPuntaje(this.jugadaJugador);
    this.puntajeCroupier = this.calcularPuntaje(this.jugadaCroupier);
  
  }
  private agregarCarta(n : number): void {
    if(n === 1){
      this.jugadaJugador.push(this.cartaService.obtenerCartaAleatoria());
    }else if (n === 2){
      this.jugadaCroupier.push(this.cartaService.obtenerCartaAleatoria());
    } else {
      this.jugadaCroupier.push(this.cartaService.obtenerDadaVuelta());
    }
  }

  repartir() : void {
    this.agregarCarta(1);
    this.agregarCarta(1);
    this.agregarCarta(3);
    this.agregarCarta(2);
    this.empezo=true;
    this.chequearPuntos(this.jugadaJugador);
    this.actualizarPuntajes();
  }

  private calcularPuntaje(jugada: Carta[]): number{
    let acumulador: number = 0;
    jugada.forEach(carta => {
      acumulador += carta.valorNumerico; 
    });
    return acumulador;
  }

  private chequearPuntos(jugada: Carta[]): void {

    if(this.calcularPuntaje(jugada)> 21){
      for (let carta of jugada) {
        if (carta.valorNumerico === 11){
          carta.valorNumerico = 1;
          return;
        }
      }
      this.perdio = true;
      this.terminoJugada = true;
    } else if (this.calcularPuntaje(jugada) === 21) {
      this.terminoJugada = true;
    }
  }

  pedirCarta() : void{
    this.agregarCarta(1);
    this.chequearPuntos(this.jugadaJugador);
    this.actualizarPuntajes();
  }
}
