import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string
  url_inicio:string
  mostrar=true
  noMostrar=false
  token:any
  constructor(private httpClient: HttpClient, public router:Router) { 
    this.url='http://localhost:3000/api/registro'
    this.url_inicio='http://localhost:3000/api/inicio'
    
  }
  
  getLogin(pusuario,ppassword){
    return this.httpClient.post(`${this.url_inicio}/${'login'}`,{usuario:pusuario,password:ppassword}).toPromise()
  }

  getForm(pnombre, papellidos, pemail,pusuario, ppassword,pprovincia,ppoblacion){
    return this.httpClient.post(`${this.url}/${'newUser'}`,{nombre:pnombre,apellidos:papellidos,email:pemail,usuario:pusuario,password:ppassword,provincia:pprovincia,poblacion:ppoblacion}).toPromise(),
    this.router.navigate(['#myModal'])
  }

  editUser(ptoken){
    let tokenVar = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'edit'}`,{token:tokenVar}).toPromise()
  }

  updateUser(pnombre, papellidos, pemail,pusuario,pprovincia,ppoblacion){
    let tokenVar = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'update'}`,{nombre:pnombre,apellidos:papellidos,email:pemail,usuario:pusuario,provincia:pprovincia,poblacion:ppoblacion,token:tokenVar}).toPromise()
  }

  deleteUser(){
    let tokenVar = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'delete'}`,{token:tokenVar}).toPromise()
  }
  toggleMostrar(){
    this.mostrar=!this.mostrar
    this.noMostrar=!this.noMostrar
  
  }

  cerrarSesion(){
    localStorage.removeItem('token'),
    this.router.navigate(['index'])
    this.toggleMostrar()
  }


}

