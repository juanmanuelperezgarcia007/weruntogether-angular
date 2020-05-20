import { AppComponent } from './../app.component';
import { RaceService } from './../carreras-service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConstApp } from '../constantes/constApp';
import { CommonService } from '../common.service';
import { LocalstorageService } from '../localstorage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  msg = {
    weruntogether: ConstApp.WE_RUN_TOGETHER,
  };
  isCollapsed = true;
  tokenUser: string;
  noMostrarToken = false
  mostrarToken = true
  listFavorite: any
  photourl: string;

  constructor(
    public loginService: LoginService,
    public localstorageService: LocalstorageService,
    public commonService: CommonService,
    public afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.photourl = this.getLocalstorage('photo');
    this.tokenUser = this.getLocalstorage('token');
  }

  closedSession(e) {
    this.afAuth.auth.signOut();
    this.loginService.cerrarSesion();
    this.router.navigate(['index']);
    this.photourl = this.getLocalstorage('photo');
    this.tokenUser = this.getLocalstorage('token');

  }

  onlyUsers() {
    return this.commonService.OnlyUsers();
  }

  getLocalstorage(key) {
    return this.localstorageService.getLocalstorage(key);
  }


}
