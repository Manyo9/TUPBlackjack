import { Carta } from "./carta";
import { Jugador } from "./jugador";

export class Partida {
    idPartida: number;
    jugador: Jugador;
    croupier: Jugador;
    activo: boolean;
    turnoCroupier: boolean;
    constructor(){
        this.jugador = new Jugador();
        this.croupier = new Jugador();
    }

}