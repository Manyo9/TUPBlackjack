import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { Jugador } from 'src/app/models/jugador';
import { Partida } from 'src/app/models/partida';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { CartaService } from 'src/app/services/carta.service';
import { PartidaService } from 'src/app/services/partida.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})

export class MesaComponent implements OnInit, OnDestroy {
  partida: Partida;
  // jugador: Jugador;
  // croupier: Jugador;
  // empezo: boolean = false;
  // turnoCroupier: boolean = false;
  // terminoJuego: boolean = false;
  mensajeFinal: string;
  subscription: Subscription;
  constructor(private cartaService: CartaService, private partidaService: PartidaService) {
    this.partida = new Partida();
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarPartida();
    this.reiniciar();
  }
  private cargarPartida(): void {
    this.subscription.add(
      this.partidaService.empezarPartida().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            this.partida = r.resultado as Partida;
            console.log(this.partida.jugador);
          }
          else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  private obtenerCarta(): any {

    this.subscription.add(
      this.cartaService.obtenerCarta(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            return r.resultado[0];
          } else {
            console.error(r.mensaje);
            return undefined;
          }
        },
        error: (e) => {
          console.error(e);
          return undefined;
        }
      })
    )
    return undefined;
  }

  private obtenerCartaDadaVuelta(): Carta {
    return this.cartaService.obtenerDadaVuelta();
  }

  async repartir() {
    this.partida.jugador.tomarCarta(this.pedirCarta());
    this.partida.jugador.tomarCarta(this.pedirCarta());
    // this.partida.croupier.tomarCarta(this.obtenerCartaDadaVuelta()); 
    // this.partida.croupier.tomarCarta(this.obtenerCarta()); // debe implementar un metodo distinto al del jugador
  }

  pedirCarta(): void {
    this.partida.jugador.tomarCarta(this.obtenerCarta());
  }

  terminarJugada(): void {
    this.partida.jugador.terminoJugada = true;
  }

  reiniciar(): void {
    this.partida.empezo = false;
    this.partida.turnoCroupier = false;
    this.partida.terminoJuego = false;
    this.mensajeFinal = '';
    this.partida.jugador = new Jugador('Jugador', [], 0, false, false, false);
    this.partida.croupier = new Jugador('Croupier', [], 0, true, false, false);
  }

  private chequearGanador(): void {
    if (!this.partida.jugador.perdio && this.partida.croupier.perdio) {
      //gano jugador porque se pasó el croupier
      this.mensajeFinal = "Ganaste! el croupier se pasó! Felicidades!";

    } else if (this.partida.jugador.perdio && !this.partida.croupier.perdio) {
      //gano croupier porque se pasó el jugador
      this.mensajeFinal = "Perdiste! Te pasaste! Mejor suerte la próxima!";

    } else if (!this.partida.jugador.perdio && !this.partida.croupier.perdio) {
      //ninguno se pasó
      // chequeo de blackjack
      if (this.partida.jugador.puntos === this.partida.croupier.puntos) {
        //igual puntaje
        if (this.partida.jugador.tieneBlackjack() && !this.partida.croupier.tieneBlackjack()) {
          //gana jugador por blackjack
          this.mensajeFinal = "Ganaste por tener blackjack."
        } else if (!this.partida.jugador.tieneBlackjack() && this.partida.croupier.tieneBlackjack()) {
          // gana croupier por blackjack
          this.mensajeFinal = "Perdiste porque el croupier obtuvo blackjack."
        } else {
          //empate
          this.mensajeFinal = "Empataron por igualdad de puntos.";
        }
      } else if (this.partida.jugador.puntos > this.partida.croupier.puntos) {
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
    this.partida.terminoJuego = true;
  }

  private jugarCroupier() {
    this.partida.turnoCroupier = true;
    this.partida.croupier.quitarBocaAbajo();

    while (!this.partida.croupier.terminoJugada) {
      this.partida.croupier.tomarCarta(this.obtenerCarta());
    }

    this.chequearGanador();
  }

  continuar(): void {
    this.jugarCroupier();
  }
}