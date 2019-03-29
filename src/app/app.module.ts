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
import { HashLocationStrategy, LocationStrategy} from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { WeruntogetherComponent } from './weruntogether/weruntogether.component';
import { ComentariosComponent } from './comentarios/comentarios.component';




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
 
 
 
    
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
   
   
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
