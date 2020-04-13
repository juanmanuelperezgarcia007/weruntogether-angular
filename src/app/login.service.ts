import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component'
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  noMostrarToken = false
  mostrarToken = true
  url: string
  url_inicio: string
  mostrar = true
  noMostrar = false
  token: any
  tokenUsuario: any
  photourl: any
  addCarreras: string
  subject = new BehaviorSubject(true)

  constructor(private httpClient: HttpClient, public router: Router) {
    // ONLINE
    // this.url = 'https://back.weruntogether.es/api/registro'
    // this.url_inicio = 'https://back.weruntogether.es/api/inicio'

    // LOCAL
    this.url = 'http://localhost:3000/api/registro';
    this.url_inicio = 'http://localhost:3000/api/inicio';
    this.addCarreras = 'http://localhost:3000/api/carreras';

  }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token');
    this.subject.asObservable().subscribe((result) => {
      console.log(result);
    });

  }
  getPhoto() {
    return localStorage.getItem('photo')
  }
  saveCarreras(id, date, name, status, distance, province, city, type) {
    return this.httpClient.post(`${this.addCarreras}/${'addCarreras'}`, { id: id, date: date, name: name, status: status, distance: distance, province: province, city: city, type: type }).toPromise()
  }

  getLoginGoogle(pnombre, ptoken, pUseremail, pcreacion, pultimaconexion, pphoto) {
    return this.httpClient.post(`${this.url_inicio}/${'loginGoogle'}`, { email: pUseremail, token: ptoken, nombre: pnombre, creacion: pcreacion, ultimaconexion: pultimaconexion, photo: pphoto }).toPromise()
  }

  getLogin(pemail, ppassword) {
    return this.httpClient.post(`${this.url_inicio}/${'login'}`, { email: pemail, password: ppassword }).toPromise()
  }

  getForm(pemail, pusuario, ppassword) {
    return this.httpClient.post(`${this.url}/${'newUser'}`, { email: pemail, usuario: pusuario, password: ppassword }).toPromise(),
      this.router.navigate(['#myModal'])
  }

  editUser(ptoken) {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'edit'}`, { token: tokenUsuario }).toPromise()
  }

  updateUser(pemail, pusuario) {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'update'}`, { email: pemail, usuario: pusuario, token: tokenUsuario }).toPromise()
  }

  deleteUser() {
    let tokenUsuario = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'delete'}`, { token: tokenUsuario }).toPromise()
  }

  cerrarSesion() {
    localStorage.removeItem('token'),
      localStorage.removeItem('photo'),

      this.router.navigate(['index'])

  }
}
