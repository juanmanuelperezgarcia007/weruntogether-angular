import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';


declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tokenUsuario: any
  title = 'WERUNTOGETHER';
  userToken: any
  regform: FormGroup;
  mostrar = true
  noMostrar = false
  token: any
  photourl: any
  ChangeHeaderPerfil: boolean

  constructor(private loginService: LoginService, public router: Router, public afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token')
    this.regform = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)]),

    })

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      window.scrollTo(0, 0)
    })



  }
  iniciar(e) {

    this.loginService.getLogin(this.regform.value.email, this.regform.value.password)
      .then((res: any) => {

        if (res.error != undefined) {
          e.path[3].children[0].children[4].children[0].classList.replace('hide', 'show')

        } else {
          this.Perfil(e)
          localStorage.setItem('token', res.toString())
          this.tokenUsuario = localStorage.getItem('token')
          $("[data-dismiss=modal]").trigger({ type: "click" })
          this.router.navigate(['index'])
        }


      })
  }

  iniciarGoogle(e) {

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res: any) => {
      let photo = res.user.providerData[0].photoURL
      localStorage.setItem('photo', photo)
      console.log('estoy dentro iniciar google')
      this.loginService.subject.next(false);
      this.loginService.subject.subscribe
      let token = res.credential.idToken
      let nombre = res.user.displayName
      let Useremail = res.user.email
      let creacion = res.user.metadata.creationTime
      let ultimaconexion = res.user.metadata.lastSignInTime
      localStorage.setItem('token', res.credential.idToken.toString())
      this.tokenUsuario = localStorage.getItem('token')
      $("[data-dismiss=modal]").trigger({ type: "click" })
      this.PerfilGoogle(e)
      this.loginService.getLoginGoogle(nombre, token, Useremail, creacion, ultimaconexion, photo)
        .then((ret) => {
          console.log(ret)
        })
      this.router.navigate(['index'])


    })

  }

  Perfil(e) {
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[3].classList.add('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[4].classList.add('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[2].classList.remove('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[5].classList.remove('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[6].classList.remove('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[7].classList.remove('hide')

  }

  PerfilGoogle(e) {
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[3].classList.add('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[4].classList.add('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[2].classList.remove('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[5].classList.remove('hide')
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[7].classList.remove('hide')

  }

  tokenStart() {
    if (this.tokenUsuario == null) {
      return false
    } else {
      return true
    }
  }

}
