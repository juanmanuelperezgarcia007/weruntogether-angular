import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent} from './app.component'
@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  
  noMostrarToken = false
  mostrarToken= true
  url: string
  url_inicio: string
  mostrar = true
  noMostrar = false
  token: any
  tokenUsuario:any
  constructor(private httpClient: HttpClient, public router: Router) {
    this.url = 'https://back.weruntogether.es/api/registro'
    this.url_inicio = 'https://back.weruntogether.es/api/inicio'
    // this.url = 'http://localhost:3000/api/registro'
    // this.url_inicio = 'http://localhost:3000/api/inicio'

  }

  ngOnInit(){
   this.tokenUsuario = localStorage.getItem('token')
   console.log(this.tokenUsuario)
  }

  getLogin(pusuario, ppassword) {
    return this.httpClient.post(`${this.url_inicio}/${'login'}`, { usuario: pusuario, password: ppassword }).toPromise()
  }

  getForm(pnombre, papellidos, pemail, pusuario, ppassword, pprovincia, ppoblacion) {
    return this.httpClient.post(`${this.url}/${'newUser'}`, { nombre: pnombre, apellidos: papellidos, email: pemail, usuario: pusuario, password: ppassword, provincia: pprovincia, poblacion: ppoblacion }).toPromise(),
      this.router.navigate(['#myModal'])
  }

  editUser(ptoken) {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'edit'}`, { token: tokenUsuario }).toPromise()
  }

  updateUser(pnombre, papellidos, pemail, pusuario, pprovincia, ppoblacion) {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'update'}`, { nombre: pnombre, apellidos: papellidos, email: pemail, usuario: pusuario, provincia: pprovincia, poblacion: ppoblacion, token: tokenUsuario }).toPromise()
  }

  deleteUser() {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'delete'}`, { token: tokenUsuario }).toPromise()
  }
 

  toggleMostrar(ptokenUsuario){
    if(this.tokenUsuario==null){
      this.mostrar=true
      
    }else{
    
      this.mostrar = false
    }
  }

  toggleNoMostrar(ptokenUsuario){
    if(this.tokenUsuario==null){
  this.noMostrar=false
      
    }else{
      this.noMostrar = true
      console.log(this.noMostrar)
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token'),
    
      this.router.navigate(['index'])
    
  }

  toggleMostrarToken(ptokenUsuario){
    console.log(this.tokenUsuario)
    if(this.tokenUsuario==null){
      this.noMostrarToken = false
      this.mostrarToken=true
      console.log(this.noMostrarToken)
      
    }else{
      this.noMostrarToken = true
      this.mostrarToken=false
      console.log(this.noMostrarToken)

    }


}
}
