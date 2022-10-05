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
  
  private agregarCarta(jugada : Carta[]): void {
    jugada.push(this.cartaService.obtenerCartaAleatoria());
  }

  private agregarCartaDadaVuelta(jugada : Carta[]): void {
    jugada.push(this.cartaService.obtenerDadaVuelta());
  }

  repartir() : void {
    this.agregarCarta(this.jugadaJugador);
    this.agregarCarta(this.jugadaJugador);
    this.agregarCartaDadaVuelta(this.jugadaCroupier);
    this.agregarCarta(this.jugadaCroupier);
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
          this.terminoJugada = this.calcularPuntaje(jugada) === 21;  //En caso de que la ultima carta sea un as teniendo un puntaje de 20
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
    this.agregarCarta(this.jugadaJugador);
    this.chequearPuntos(this.jugadaJugador);
    this.actualizarPuntajes();
  }

  terminarJugada() : void {
    this.terminoJugada = true;
  }

  reiniciar() : void {
    this.jugadaJugador = [];
    this.jugadaCroupier = [];
    this.puntajeJugador = 0;
    this.puntajeCroupier = 0;
    this.empezo = false;
    this.perdio = false;
    this.terminoJugada = false;
  }

  continuar() : void {

  }
}
