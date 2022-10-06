import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { Jugador } from 'src/app/models/jugador';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})

export class MesaComponent implements OnInit {
  jugador: Jugador;
  croupier: Jugador;
  empezo: boolean = false;
  turnoCroupier: boolean = false;
  terminoJuego: boolean = false;
  mensajeFinal: string;

  constructor(private cartaService: CartaService) { }


  ngOnInit(): void {
    this.reiniciar();
  }

  private obtenerCarta(): Carta {
    return this.cartaService.obtenerCartaAleatoria();
  }

  private obtenerCartaDadaVuelta(): Carta {
    return this.cartaService.obtenerDadaVuelta();
  }

  repartir(): void {
    this.jugador.tomarCarta(this.obtenerCarta());
    this.jugador.tomarCarta(this.obtenerCarta());
    this.croupier.tomarCarta(this.obtenerCartaDadaVuelta());
    this.croupier.tomarCarta(this.obtenerCarta());
    this.empezo = true;
  }

  pedirCarta(): void {
    this.jugador.tomarCarta(this.obtenerCarta());
  }

  terminarJugada(): void {
    this.jugador.terminoJugada = true;
  }

  reiniciar(): void {
    this.empezo = false;
    this.turnoCroupier = false;
    this.terminoJuego = false;
    this.jugador = new Jugador('Jugador', [], 0, false, false, false);
    this.croupier = new Jugador('Croupier', [], 0, true, false, false);
  }

  private chequearGanador(): void {
    if (!this.jugador.perdio && this.croupier.perdio) {
      //gano jugador porque se pasó el croupier
      this.mensajeFinal = "Ganaste! el croupier se pasó! Felicidades!";

    } else if (this.jugador.perdio && !this.croupier.perdio) {
      //gano croupier porque se pasó el jugador
      this.mensajeFinal = "Perdiste! Te pasaste! Mejor suerte la próxima!";

    } else if (!this.jugador.perdio && !this.croupier.perdio) {
      //ninguno se pasó
      // chequeo de blackjack
      if (this.jugador.puntos === this.croupier.puntos) {
        //igual puntaje
        if (this.jugador.tieneBlackjack() && !this.croupier.tieneBlackjack()) {
          //gana jugador por blackjack
          this.mensajeFinal = "Ganaste por tener blackjack."
        } else if (!this.jugador.tieneBlackjack() && this.croupier.tieneBlackjack()) {
          // gana croupier por blackjack
          this.mensajeFinal = "Perdiste porque el croupier obtuvo blackjack."
        } else {
          //empate
          this.mensajeFinal = "Empataron por igualdad de puntos.";
        }
      } else if (this.jugador.puntos > this.croupier.puntos) {
        //gana jugador por mayor puntaje
        this.mensajeFinal = "Ganaste por tener más puntos! Felicidades!";
      } else {
        //gana croupier por mayor puntaje
        this.mensajeFinal = "Perdiste por tener menos puntos! Mejor suerte la próxima!";
      }

    } else {
      // Empate ya que ambos se pasaron
      this.mensajeFinal = "Empataron! Ambos perdieron!";
    }
    this.terminoJuego = true;
  }

  private jugarCroupier() {
    this.turnoCroupier = true;
    this.croupier.quitarBocaAbajo();

    while (!this.croupier.terminoJugada) {
      this.croupier.tomarCarta(this.obtenerCarta());
    }

    this.chequearGanador();
  }

  continuar(): void {
    this.jugarCroupier();
  }
}