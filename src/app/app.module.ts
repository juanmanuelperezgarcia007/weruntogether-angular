import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
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
import { TiendasComponent } from './tiendas/tiendas.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    RegistroComponent,
    NoticiasComponent,
    CarrerasComponent,
    TiendasComponent,
   
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes)
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
