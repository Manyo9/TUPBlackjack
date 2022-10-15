import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartaComponent } from './juego/carta/carta.component';
import { MesaComponent } from './juego/mesa/mesa.component';
import { CartaService } from './services/carta.service';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { HttpClientModule } from '@angular/common/http'
import { PartidaService } from './services/partida.service';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    MesaComponent,
    HeaderComponent,
    InicioComponent,
    NoEncontradoComponent,
    IniciarSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CartaService,
    PartidaService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
