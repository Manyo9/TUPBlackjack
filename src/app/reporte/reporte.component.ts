import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  private subscription: Subscription;
  indiceResultados: any[];
  cantidadJuegosJugadores: any[];
  promedioVeintiuno: any[];
  cantidadVictoriasUsuario: any[];

  datosIndiceResultados: ChartData<'bar'>;
  datosVictoriasUsuario: ChartData<'bar'>;
  datosPromedioVeintiuno: ChartData<'bar'>;
  datosCantidadJuegosJugadores: ChartData<'line'>;


  constructor(
    private servicioReporte: ReporteService
  ) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.obtenerIndiceResultados();
    this.obtenerCantidadJuegosJugadores();
    this.obtenerPromedioVeintiuno();
    this.obtenerCantidadVictoriasUsuario();
  }
  obtenerIndiceResultados(): void {
    this.subscription.add(
      this.servicioReporte.obtenerIndiceResultados().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok && r.resultado) {

            this.indiceResultados = r.resultado;
            this.datosIndiceResultados = {
              labels: ['Indices de resultado'],
              datasets: [
              ],
            };

            r.resultado.forEach((f: any) => {
              this.datosIndiceResultados.datasets.push(
                {
                  label: f.ganador,
                  data: [
                    f.cantidadVictorias
                  ],
                }
              );
            });
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    );
  }
  obtenerCantidadJuegosJugadores(): void {
    this.subscription.add(
      this.servicioReporte.obtenerCantidadJuegosJugadores().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok && r.resultado) {
            this.cantidadJuegosJugadores = r.resultado;
            //   this.datosCantidadJuegosJugadores = {
            //     labels : [
            //       'January',
            //       'February',
            //       'March',
            //       'April'
            //     ],
            //    datasets: [
            //     {
            //       data: [330, 600, 260, 700],
            //       label: 'Jugadores'
            //     },
            //     {
            //       data: [120, 455, 100, 340],
            //       label: 'Juegos'
            //     }
            //   ]
            // };
            this.datosCantidadJuegosJugadores = {labels: [

            ], datasets: [
              {
                label: 'Juegos',
                data: []
              },
              {
                label: 'Jugadores',
                data: []
              }
            ]};
            r.resultado.forEach((f:any) => {
              this.datosCantidadJuegosJugadores.labels!.push(new Date(f.fecha).toLocaleDateString());
              this.datosCantidadJuegosJugadores.datasets![0].data.push(f.juegos)
              this.datosCantidadJuegosJugadores.datasets![1].data.push(f.jugadores)
            });
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    );
  }
  obtenerCantidadVictoriasUsuario(): void {
    this.subscription.add(
      this.servicioReporte.obtenerCantidadVictoriasUsuario().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok && r.resultado) {
            this.cantidadVictoriasUsuario = r.resultado;
            this.datosVictoriasUsuario = {
              labels: ['Victorias por usuario'],
              datasets: [
              ],
            };

            r.resultado.forEach((f: any) => {
              this.datosVictoriasUsuario.datasets.push(
                {
                  label: f.usuario,
                  data: [
                    f.victorias
                  ],
                }
              );
            });
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    );
  }
  obtenerPromedioVeintiuno(): void {
    this.subscription.add(
      this.servicioReporte.obtenerPromedioVeintiuno().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok && r.resultado) {
            this.cantidadVictoriasUsuario = r.resultado;
            this.datosPromedioVeintiuno = {
              labels: ['Promedio de jugadas con puntaje 21'],
              datasets: [
                {
                  label: 'jugadores',
                  data: [
                    r.resultado.jugadores
                  ],
                },
                {
                  label: 'croupier',
                  data: [
                    r.resultado.croupier
                  ],
                }
              ],
            };
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    );
  }
}
