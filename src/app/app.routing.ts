import{ Routes } from '@angular/router'
import{ IndexComponent } from './index/index.component';
import{ RegistroComponent } from './registro/registro.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { TiendasComponent } from './tiendas/tiendas.component';






export const appRoutes: Routes=[
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'noticias', component: NoticiasComponent},
    
    {path: 'carreras', component: CarrerasComponent},
    {path: 'tiendas', component: TiendasComponent},
    {path: 'registro', component: RegistroComponent},
   
  

]