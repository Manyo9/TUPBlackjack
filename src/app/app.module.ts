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
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IniciarSesionButtonComponent } from './iniciar-sesion-button/iniciar-sesion-button.component';
import { SesionIniciadaService } from './services/sesion-iniciada.service';
import { ReporteService } from './services/reporte.service';
import { ReporteComponent } from './reporte/reporte.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    MesaComponent,
    HeaderComponent,
    InicioComponent,
    NoEncontradoComponent,
    IniciarSesionComponent,
    CerrarSesionComponent,
    NavbarComponent,
    IniciarSesionButtonComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    CartaService,
    PartidaService,
    UsuarioService,
    SesionIniciadaService,
    ReporteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
