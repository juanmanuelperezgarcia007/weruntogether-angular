import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WERUNTOGETHER';
  userToken:any
  regform: FormGroup;
  constructor(private loginService: LoginService, public router:Router) { }


  ngOnInit() {
    this.regform = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)]),

    })


  }
  iniciar() {
    
    this.loginService.getLogin(this.regform.value.usuario, this.regform.value.password)
      .then((res) => {
        console.log(res)

        if(res['error']){
          alert('Usuario y/o contraseña es incorrecta')

        }else{
          localStorage.setItem('token',res.toString())
          $("[data-dismiss=modal]").trigger({ type: "click" })
          this.loginService.toggleMostrar()
          this.router.navigate(['index'])
        }
        

      })
  }
}
