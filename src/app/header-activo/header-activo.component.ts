import { Component, OnInit } from '@angular/core';
import { CarrerasService } from './../carreras-service';
import { LoginService } from '../login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-header-activo',
  templateUrl: './header-activo.component.html',
  styleUrls: ['./header-activo.component.css']
})
export class HeaderActivoComponent implements OnInit {
  isCollapsed: boolean
  tokenUsuario: any
  noMostrarToken = false
  mostrarToken = true
  listFavorite: any
  photourl: any
  constructor(public loginService: LoginService, private carrerasService: CarrerasService, public afAuth: AngularFireAuth, private router: Router) {

  }
  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token')
    this.isCollapsed = true
    this.photourl = localStorage.getItem('photo')

  }



  closedSession(e) {
    this.afAuth.auth.signOut();
    this.loginService.cerrarSesion()
    this.ChangeHeaderClosed(e)
    this.router.navigate(['index']);

  }

  ChangeHeaderClosed(e) {
    e.path[1].children[3].classList.remove('hide')
    e.path[1].children[4].classList.remove('hide')
    e.path[1].children[2].classList.add('hide')
    e.path[1].children[5].classList.add('hide')
    e.path[1].children[6].classList.add('hide')
    e.path[1].children[7].classList.add('hide')
    e.path[1].children[8].classList.add('hide')
  }
  OnlyUsers() {

    if (this.tokenUsuario == null) {
      return true
    } else {
      return false
    }
  }
}
