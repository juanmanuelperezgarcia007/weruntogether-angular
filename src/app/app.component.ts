import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tokenUsuario: any
  title = 'WERUNTOGETHER';
  userToken:any
  regform: FormGroup;
  mostrar = true
  noMostrar = false
  token: any
  
  constructor(private loginService: LoginService, public router:Router) { }


  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token')
    this.regform = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)]),

    })

    this.router.events.subscribe((evt)=>{
      if(!(evt instanceof NavigationEnd)){
        return
      }
      window.scrollTo(0,0)
    })
  
    
  }
  iniciar() {
    
    this.loginService.getLogin(this.regform.value.usuario, this.regform.value.password)
      .then((res) => {
       

        if(res['error']){
          alert('Usuario y/o contraseña es incorrecta')

        }else{
          localStorage.setItem('token',res.toString())
          this.tokenUsuario = localStorage.getItem('token')
          $("[data-dismiss=modal]").trigger({ type: "click" })
         
          
          this.loginService.toggleMostrarToken(this.tokenUsuario)
          location.reload()

          this.router.navigate(['index'])
        }
        

      })

  }
 
}
