import { Carta } from "./carta";

export class Jugador {
    nombre: string;
    mano: Carta[];
    puntos: number;
    esCroupier: boolean;
    terminoJugada: boolean;
    perdio: boolean;

    constructor (nombre?: string, mano?: Carta[], puntos?: number, esCroupier?: boolean, terminoJugada?: boolean, perdio?: boolean) {
        this.nombre = nombre? nombre : "";
        this.mano = mano? mano : [];
        this.puntos = puntos? puntos : 0;
        this.esCroupier = esCroupier? esCroupier : false;
        this.terminoJugada = terminoJugada? terminoJugada : false;
        this.perdio = perdio? perdio : false;
    }

    tomarCarta(carta: any): void{
        this.mano.push(carta);
        this.chequearCondicion();
        this.puntos = this.calcularPuntos();
    }

    tieneBlackjack(): boolean{
        return (this.puntos === 21 && this.mano.length === 2)
    }

    calcularPuntos(): number{
        let acumulador: number = 0;
        this.mano.forEach(carta => {
            acumulador += carta.valorNumerico; 
        });
        return acumulador;
    }

    forzarPlantado() : boolean {
        if(this.esCroupier){
            return this.calcularPuntos() > 16;
        } else {
            return this.calcularPuntos() === 21;
        }
    }

    chequearCondicion(): void {
        if(this.calcularPuntos() > 21){
          for (let carta of this.mano) {
            if (carta.valorNumerico === 11){
                carta.valorNumerico = 1;
                this.terminoJugada = this.forzarPlantado();  //Failsafe por si la ultima carta pedida es un as
                return;
              }    
            }
            this.perdio = true;
            this.terminoJugada = true;
        } else if (this.forzarPlantado()) {
            this.terminoJugada = true;
        }
    }

    quitarBocaAbajo(): void {
        if(this.esCroupier){
            this.mano.shift();
        }
    }

}
