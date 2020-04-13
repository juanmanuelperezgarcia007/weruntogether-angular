import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tokenUsuario: string;
  title = 'WERUNTOGETHER';
  userToken: string;
  regform: FormGroup;
  mostrar = true;
  noMostrar = false;
  token: string;
  photourl: string;
  ChangeHeaderPerfil: boolean;

  constructor(private loginService: LoginService, public router: Router, public afAuth: AngularFireAuth) {
    this.photourl = localStorage.getItem('photo');
  }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token');
    this.regform = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)]),

    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });



  }
  iniciar(e) {

    this.loginService.getLogin(this.regform.value.email, this.regform.value.password)
      .then((res: any) => {

        if (res.error !== undefined) {
          e.path[3].children[0].children[4].children[0].classList.replace('hide', 'show');

        } else {
          this.Perfil(e);
          localStorage.setItem('token', res.toString());
          this.tokenUsuario = localStorage.getItem('token');
          $('[data-dismiss=modal]').trigger({ type: 'click' });
          this.router.navigate(['index']);
        }


      });
  }

  async iniciarGoogle(e) {

    const googleUser: any = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const newGoogleUser = {
      photo: googleUser.user.providerData[0].photoURL,
      token: googleUser.credential.idToken,
      nombre: googleUser.user.displayName,
      useremail: googleUser.user.email,
      creacion: googleUser.user.metadata.creationTime,
      ultimaconexion: googleUser.user.metadata.lastSignInTime,
    };
    localStorage.setItem('photo', newGoogleUser.photo);
    this.photourl = newGoogleUser.photo;
    localStorage.setItem('token', googleUser.credential.idToken.toString());
    this.tokenUsuario = newGoogleUser.token;
    this.loginService.subject.next(false);
    $('[data-dismiss=modal]').trigger({ type: 'click' });
    this.PerfilGoogle(e);

    await this.loginService.getLoginGoogle(
      newGoogleUser.nombre,
      newGoogleUser.token,
      newGoogleUser.useremail,
      newGoogleUser.creacion,
      newGoogleUser.ultimaconexion,
      newGoogleUser.photo);
    this.router.navigate(['index']);

  }

  Perfil(e) {
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[3].classList.add('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[4].classList.add('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[2].classList.remove('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[5].classList.remove('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[6].classList.remove('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[7].classList.remove('hide');

  }

  PerfilGoogle(e) {
    console.log(this.photourl);
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[3].classList.add('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[4].classList.add('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[2].classList.remove('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[5].classList.remove('hide');
    e.path[7].children[0].children[0].children[0].children[2].children[0].children[7].classList.remove('hide');

  }

  tokenStart() {
    if (this.tokenUsuario == null) {
      return false;
    } else {
      return true;
    }
  }

}
