import { Component, OnInit} from '@angular/core';
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
  perdioJugador : boolean = false;
  terminoJugada : boolean = false;
  turnoCroupier : boolean = false;
  terminoCroupier : boolean = false;
  perdioCroupier : boolean = false;
  terminoJuego : boolean = false;
  mensajeFinal : string;

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
        this.perdioJugador = true;
        this.terminoJugada = true;
      } else if (this.calcularPuntaje(jugada) === 21) {
        this.terminoJugada = true;
      }
  }

  private chequearCroupier(jugada: Carta[]): void{
    if(this.calcularPuntaje(jugada)> 21){
      for (let carta of jugada) {
        if (carta.valorNumerico === 11){
            carta.valorNumerico = 1;
            this.terminoCroupier = this.calcularPuntaje(jugada) > 16;
            return;
          }    
      }
        this.perdioCroupier = true;
        this.terminoCroupier = true;
      } else if (this.calcularPuntaje(jugada) > 16) {
        this.terminoCroupier = true;
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
    this.perdioJugador = false;
    this.terminoJugada = false;
    this.turnoCroupier = false;
    this.terminoCroupier = false;
    this.perdioCroupier = false;
    this.terminoJuego = false;
  }

  private chequearGanador(): void{
    if(this.perdioCroupier && !this.perdioJugador){
      //gano jugador
      this.mensajeFinal = "Ganaste! Felicidades!";
    }
    else if (this.perdioJugador && !this.perdioCroupier){
      //gano croupier
      this.mensajeFinal = "Perdiste! Mejor suerte la próxima!";
    }
    else if (!this.perdioJugador && !this.perdioCroupier) {
      //ninguno se pasó
      if (this.puntajeJugador === this.puntajeCroupier) {
        //igual puntaje
        if(this.puntajeJugador === 21) {
          if(this.jugadaJugador.length === this.jugadaCroupier.length) {
            //empate
            this.mensajeFinal = "Empataron!";
          }
          else if(this.jugadaJugador.length > this.jugadaCroupier.length) {
            //gano croupier
            this.mensajeFinal = "Perdiste! Mejor suerte la próxima!";
          }
          else{
            //gano jugador
            this.mensajeFinal = "Ganaste! Felicidades!";
          }
        }
        //empate
        this.mensajeFinal = "Empataron!";
      }
      else if (this.puntajeJugador > this.puntajeCroupier) {
        //gana jugador
        this.mensajeFinal = "Ganaste! Felicidades!";
      }
      else {
        //gana croupier
        this.mensajeFinal = "Perdiste! Mejor suerte la próxima!";
      }
    }
    this.terminoJuego = true;
  }

  private jugarCroupier(){
    this.turnoCroupier = true;
    this.jugadaCroupier.shift();

    while(!this.terminoCroupier){
      this.agregarCarta(this.jugadaCroupier);
      this.chequearCroupier(this.jugadaCroupier);
      this.actualizarPuntajes();
    }

    this.chequearGanador();
  }

  continuar() : void {
    this.jugarCroupier();
  }
}