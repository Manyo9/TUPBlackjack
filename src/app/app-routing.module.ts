import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { MesaComponent } from './juego/mesa/mesa.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';

const routes: Routes = [
  {path: 'jugar', component: MesaComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path:'', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
