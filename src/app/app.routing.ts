import { Routes } from '@angular/router'
import { IndexComponent } from './index/index.component';
import { RegistroComponent } from './registro/registro.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { PerfilComponent } from './perfil/perfil.component';
import { WeruntogetherComponent } from './weruntogether/weruntogether.component';
import { ComentariosComponent } from './comentarios/comentarios.component'
import { ForoComponent } from './foro/foro.component';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { CarrerasfavoritasComponent } from './carrerasfavoritas/carrerasfavoritas.component'






export const appRoutes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'foro', component: ForoComponent },
    { path: 'carreras', component: CarrerasComponent },
    { path: 'proximascarreras', component: CarrerasfavoritasComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'weruntogether', component: WeruntogetherComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'comentarios/:id', component: ComentariosComponent },
    { path: 'respuestas/:id', component: RespuestasComponent },
    { path: '**', redirectTo: 'index' }



]