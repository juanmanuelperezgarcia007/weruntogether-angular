import{ Routes } from '@angular/router'
import{ IndexComponent } from './index/index.component';
import{ RegistroComponent } from './registro/registro.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { PerfilComponent } from './perfil/perfil.component';
import { WeruntogetherComponent } from './weruntogether/weruntogether.component';
import { ComentariosComponent } from './comentarios/comentarios.component'







export const appRoutes: Routes=[
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'noticias', component: NoticiasComponent},
    {path: 'carreras', component: CarrerasComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'weruntogether', component: WeruntogetherComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'comentarios/:id', component: ComentariosComponent},  
    {path: '**', redirectTo: 'index' } 
    
  

]