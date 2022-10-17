import { Carta } from "./carta";
import { Jugador } from "./jugador";

export class Partida {
    idPartida: number;
    jugador: Jugador;
    croupier: Jugador;
    empezo: boolean;
    turnoCroupier: boolean;
    constructor(){
        this.jugador = new Jugador();
        this.croupier = new Jugador();
    }

}