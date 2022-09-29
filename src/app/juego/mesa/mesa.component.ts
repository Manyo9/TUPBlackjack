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
  constructor(private cartaService: CartaService) { }

  ngOnInit(): void {


  }
  agregarCarta(): void {

    this.cartas.push(this.cartaService.obtenerCarta());
  }
}
