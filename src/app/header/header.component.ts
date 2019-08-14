import { CarrerasService } from './../carreras-service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(public loginService: LoginService, private carrerasService: CarrerasService, private router: Router) {

  }

  ngOnInit() {

    this.tokenUsuario = localStorage.getItem('token')
    this.isCollapsed = true

    this.toggleMostrarToken(this.tokenUsuario)
  }



  closedSession() {
    this.loginService.cerrarSesion()
    this.toggleMostrarToken(this.tokenUsuario)
    location.reload();
    this.router.navigate(['index']);
  }
  toggleMostrarToken(ptokenUsuario) {
    if (this.tokenUsuario == null) {
      this.noMostrarToken = false
      this.mostrarToken = true


    } else {
      this.noMostrarToken = true
      this.mostrarToken = false

    }
  }
}
