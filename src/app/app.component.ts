import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LocalstorageService } from './localstorage.service';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'WERUNTOGETHER';
  regform: FormGroup;

  constructor(
    private loginService: LoginService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public localstorageService: LocalstorageService
  ) { }

  ngOnInit() {

    this.regform = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)])
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  async iniciar(e) {

    const result: any = await this.loginService.getLogin(this.regform.value.email, this.regform.value.password);

    // if (result.error !== undefined) {
    //   e.path[3].children[0].children[4].children[0].classList.replace('hide', 'show');
    //   console.log(e.path[3].children[0].children[4].children[0])

    // } else {
    //   this.Perfil(e);
    //   localStorage.setItem('token', result.toString());
    //   this.tokenUsuario = localStorage.getItem('token');
    //   $('[data-dismiss=modal]').trigger({ type: 'click' });
    //   this.router.navigate(['index']);
    // }



  }

  async iniciarGoogle(event) {
    const src = event.path[7].children[0].children[0].children[0].children[2].children[0].children;

    this.getGoogle().then(newGoogleUser => {
      this.localstorage(newGoogleUser);
      $('[data-dismiss=modal]').trigger({ type: 'click' });
      this.PerfilGoogle(src);
      this.getLoginGoogle(newGoogleUser);
      this.loginService.getLoginGoogle$.next(true);
      this.router.navigate(['index']);
    });
  }

  async getGoogle() {
    const googleUser: any = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const newGoogleUser = {
      photo: googleUser.user.providerData[0].photoURL,
      token: googleUser.credential.idToken.toString(),
      nombre: googleUser.user.displayName,
      useremail: googleUser.user.email,
      creacion: googleUser.user.metadata.creationTime,
      ultimaconexion: googleUser.user.metadata.lastSignInTime,
    };
    return newGoogleUser;
  }

  localstorage(newGoogleUser) {
    this.localstorageService.postLocalstorage('photo', newGoogleUser.photo);
    this.localstorageService.postLocalstorage('token', newGoogleUser.token);
  }

  async getLoginGoogle(newGoogleUser) {
    const password = await this.loginService.getLoginGoogle(
      newGoogleUser.nombre,
      newGoogleUser.token,
      newGoogleUser.useremail,
      newGoogleUser.creacion,
      newGoogleUser.ultimaconexion,
      newGoogleUser.photo
    );
    console.log(password)
  }

  PerfilGoogle(hijo) {

    hijo[3].classList.add('hide');
    hijo[4].classList.add('hide');
    hijo[2].classList.remove('hide');
    hijo[5].classList.remove('hide');
    hijo[7].classList.remove('hide');

  }

}
