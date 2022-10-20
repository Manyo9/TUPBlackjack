import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SesionIniciadaService {

  private sesionSubject: Subject<boolean>;
  constructor() { 
    this.sesionSubject = new Subject<boolean>;
  }

  cambiarEstado(x: boolean){
    this.sesionSubject.next(x);
  }

  sesionCambio = (): Observable<boolean> => this.sesionSubject.asObservable();
}

