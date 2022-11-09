import { Component, OnInit } from '@angular/core';
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
  indiceVictoriasCroupier: any[];
  constructor(
    private servicioReporte: ReporteService
  ) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.obtenerIndiceVictoriasCroupier();
  }
  obtenerIndiceVictoriasCroupier(): void {
    this.subscription.add(
      this.servicioReporte.obtenerIndiceVictoriasCroupier().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok && r.resultado) {
            this.indiceVictoriasCroupier = r.resultado;
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
