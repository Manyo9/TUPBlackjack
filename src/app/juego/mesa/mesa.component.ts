import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  empezo: boolean = false;
  mensajeFinal: string;
  subscription: Subscription;
  constructor(
    private cartaService: CartaService, 
    private partidaService: PartidaService,
    private router: Router
    ) {
    this.partida = new Partida();
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

  }
  private cargarPartidaExistente(): void {
    this.subscription.add(
      this.partidaService.obtenerPartidaActiva().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            //Mapeo manual para que funcionen los metodos de jugador y croupier
            this.partida.idPartida = r.resultado.idPartida;
            this.partida.activo = r.resultado.activo;
            this.partida.turnoCroupier = r.resultado.turnoCroupier;
            this.partida.jugador = new Jugador(
              r.resultado.jugador.nombre,
              r.resultado.jugador.mano,
              r.resultado.jugador.puntos,
              r.resultado.jugador.esCroupier,
              r.resultado.jugador.terminoJugada,
              r.resultado.jugador.perdio
            );
            this.partida.croupier = new Jugador(
              r.resultado.croupier.nombre,
              r.resultado.croupier.mano,
              r.resultado.croupier.puntos,
              r.resultado.croupier.esCroupier,
              r.resultado.croupier.terminoJugada,
              r.resultado.croupier.perdio
            )
            this.empezo = true;
            if(!this.partida.turnoCroupier) {
              this.partida.croupier.mano.unshift(this.obtenerCartaDadaVuelta());
            } else if(this.partida.croupier.terminoJugada) {
              this.chequearGanador();
            }
            console.log(r.mensaje);
          }
          else {
            console.error(r.mensaje);
            this.cargarNuevaPartida();
          }
        },
        error: (e) => {
          if(e.status == 401) {
            alert("Debe iniciar sesión para empezar una partida");
            this.router.navigate(['iniciar-sesion']);
          }
          else {
            console.error(e);
            this.cargarNuevaPartida();
          }
        }
      })
    )
  }
  private cargarNuevaPartida(): void {
    this.subscription.add(
      this.partidaService.empezarPartida().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            //Mapeo manual para que funcionen los metodos de jugador y croupier
            this.partida.idPartida = r.resultado.idPartida;
            this.partida.activo = r.resultado.activo;
            this.partida.turnoCroupier = r.resultado.turnoCroupier;
            this.partida.jugador = new Jugador(
              r.resultado.jugador.nombre,
              r.resultado.jugador.mano,
              r.resultado.jugador.puntos,
              r.resultado.jugador.esCroupier,
              r.resultado.jugador.terminoJugada,
              r.resultado.jugador.perdio
            );
            this.partida.croupier = new Jugador(
              r.resultado.croupier.nombre,
              r.resultado.croupier.mano,
              r.resultado.croupier.puntos,
              r.resultado.croupier.esCroupier,
              r.resultado.croupier.terminoJugada,
              r.resultado.croupier.perdio
            )
            this.empezo = true;
            console.log(r.mensaje);
            this.repartir();
          }
          else {
            alert(r.mensaje);
            this.router.navigate(['iniciar-sesion']);
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          alert(e);
          this.router.navigate(['iniciar-sesion']);
          console.error(e);
        }
      })
    )
  }


  private obtenerCartaDadaVuelta(): Carta {
    return this.cartaService.obtenerDadaVuelta();
  }
  
  empezar(): void {
    this.cargarPartidaExistente();
  }
  repartir(): void {
    this.pedirCarta();
    this.pedirCarta();
    this.partida.croupier.tomarCarta(this.obtenerCartaDadaVuelta()); 
    this.pedirCartaCroupier();
  }

  pedirCarta(): void {
    this.subscription.add(
      this.cartaService.obtenerCarta(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            const c: Carta = r.resultado as Carta;
            console.log('Se obtuvo una carta desde la api');
            this.partida.jugador.tomarCarta(c);
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  pedirCartaCroupier(): void {
    this.subscription.add(
      this.cartaService.primeraCartaCroupier(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            const c: Carta = r.resultado as Carta;
            console.log('Se obtuvo la primera carta del croupier desde la api');
            this.partida.croupier.tomarCarta(c);
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  terminarJugada(): void {
    this.partida.jugador.terminoJugada = true;
    this.subscription.add(
      this.partidaService.plantarse(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico)=>{
          if(!r.ok){
            console.error(r.mensaje);
          } else {
            console.log(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }

      })
    )
  }

  reiniciar(): void {
    this.subscription.add(
      this.partidaService.nuevaRonda(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            //Mapeo manual para que funcionen los metodos de jugador y croupier
            this.partida.idPartida = r.resultado.idPartida;
            this.partida.activo = r.resultado.activo;
            this.partida.turnoCroupier = r.resultado.turnoCroupier;
            this.partida.jugador = new Jugador(
              r.resultado.jugador.nombre,
              r.resultado.jugador.mano,
              r.resultado.jugador.puntos,
              r.resultado.jugador.esCroupier,
              r.resultado.jugador.terminoJugada,
              r.resultado.jugador.perdio
            );
            this.partida.croupier = new Jugador(
              r.resultado.croupier.nombre,
              r.resultado.croupier.mano,
              r.resultado.croupier.puntos,
              r.resultado.croupier.esCroupier,
              r.resultado.croupier.terminoJugada,
              r.resultado.croupier.perdio
            )
            this.empezo = true;
            console.log(r.mensaje);
            this.repartir();
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
  terminar(): void {
    this.subscription.add(
      this.partidaService.terminarPartida(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            this.partida = new Partida();
            this.empezo = false;
            this.mensajeFinal = '';
            console.log(r.mensaje);
          }
          else{
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  private chequearGanador(): void {
    this.subscription.add(
      this.partidaService.obtenerGanador(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if(!r.ok){
            console.error(r.mensaje);
          } else {
            console.log(r.mensaje);
            let res: string = '';
            switch (r.resultado.idGanador) {
              case 0:
                res = 'Perdiste' 
                break;
              case -1:
                res = 'Empataron' 
                break; 
              default:
                res = 'Ganaste' 
                break;
            }
            this.mensajeFinal = `${res}, razón: ${r.resultado.razon}`
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }

  private jugarCroupier(): void {
    this.partida.turnoCroupier = true;
    this.subscription.add(
      this.cartaService.jugadaCroupier(this.partida.idPartida).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            this.partida.croupier.mano = r.resultado.mano;
            this.partida.croupier.puntos = r.resultado.puntos;
            this.partida.croupier.perdio = r.resultado.perdio;
            this.partida.croupier.terminoJugada = true;
            this.chequearGanador();
          }
        }
      })
    )

  }

  continuar(): void {
    this.jugarCroupier();
  }
}