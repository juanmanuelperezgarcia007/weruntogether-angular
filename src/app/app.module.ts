import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { NoticiasComponent } from './noticias/noticias.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { WeruntogetherComponent } from './weruntogether/weruntogether.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ForoComponent } from './foro/foro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { ChartsModule } from 'ng2-charts';
import { CarrerasfavoritasComponent } from './carrerasfavoritas/carrerasfavoritas.component';
import { MeterAkmPipe } from './meter-akm.pipe';
import { ProvincePipe } from './province.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    RegistroComponent,
    NoticiasComponent,
    CarrerasComponent,
    PerfilComponent,
    WeruntogetherComponent,
    ComentariosComponent,
    ForoComponent,
    RespuestasComponent,
    CarrerasfavoritasComponent,
    MeterAkmPipe,
    ProvincePipe,





  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule


  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
