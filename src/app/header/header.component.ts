import { AppComponent } from './../app.component';
import { RaceService } from './../carreras-service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean
  tokenUsuario: any
  noMostrarToken = false
  mostrarToken = true
  listFavorite: any
  photourl: any

  constructor(public loginService: LoginService, private appcomponent: AppComponent, private raceService: RaceService, public afAuth: AngularFireAuth, private router: Router) {

    console.log(this.loginService.getPhoto())
  }

  ngOnInit() {

    this.photourl = localStorage.getItem('photo')
    console.log(this.photourl)
    this.tokenUsuario = localStorage.getItem('token')
    this.isCollapsed = true


  }

  closedSession(e) {
    this.afAuth.auth.signOut();
    this.loginService.cerrarSesion()
    this.ChangeHeaderClosed(e)
    this.router.navigate(['index']);
    localStorage.removeItem('photo')
    this.photourl = localStorage.getItem('photo')
    console.log(this.photourl)


  }

  ChangeHeaderClosed(e) {
    e.path[1].children[3].classList.remove('hide')
    e.path[1].children[4].classList.remove('hide')
    e.path[1].children[2].classList.add('hide')
    e.path[1].children[5].classList.add('hide')
    e.path[1].children[6].classList.add('hide')
    e.path[1].children[7].classList.add('hide')

  }
  OnlyUsers() {

    if (this.tokenUsuario == null) {
      return true
    } else {
      return false
    }
  }

}
