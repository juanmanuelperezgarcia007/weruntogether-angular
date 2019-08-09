import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../carreras-service'
import { FormGroup, FormControl } from '@angular/forms'
import { LoginService } from '../login.service';
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  estoyFav: boolean
  cargando: boolean
  carrerasVer: boolean;
  arrayFav: any[]
  estrella: boolean
  carrerasAll: any
  favoritosVacio: boolean
  carrerasDistance: any
  carrerasType: any
  form: FormGroup;
  tokenUsuario = localStorage.getItem('token')
<<<<<<< HEAD
  listFavorite:any
  visible:boolean
  constructor(private carrerasService: CarrerasService, private loginService: LoginService) {
   this.visible=false
=======
  listFavorite: any
  constructor(private carrerasService: CarrerasService, private loginService: LoginService) {
    this.carrerasVer = false
    this.cargando = true

    this.arrayFav = []
    // this.paintStarFavorites()


>>>>>>> develop
  }
 

  ngOnInit() {

    this.form = new FormGroup({
      min: new FormControl(''),
      max: new FormControl(''),
      type: new FormControl(''),
      date: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl(''),
    });

    this.paintStarFavorites()
    this.mostrarCarreras();

  }
  mostrarCarreras() {
    this.carrerasService.getAllCarreras()
      .then((res) => {
<<<<<<< HEAD
      

        this.carrerasAll = res
=======
        this.carrerasAll = res;
>>>>>>> develop
      })

  }

  getFiltersRace() {
    this.carrerasService.getFilters(
      this.form.value.min,
      this.form.value.max,
      this.form.value.date,
      this.form.value.type,
      this.form.value.city,
      this.form.value.province)

      .then((res) => {
<<<<<<< HEAD
        

=======
>>>>>>> develop
        this.carrerasAll = res
        if (this.carrerasAll == 0) {
          alert('No hay resultados vuelve a realizar una busqueda')
        }
      })

    this.form.reset()

  }
<<<<<<< HEAD

  postFavoritos(pid) {
    if(this.visible===false){
   
    this.carrerasService.postFavorite(
      !this.visible, 
      pid, 
=======
  selectFav(id, e) {
    this.paintStarFavorites()
    this.estoyEnFav(id)
    if (this.estoyFav === true) {
      this.deleteListFavoritos(id, e)
    } else {
      this.postFavoritos(id, e)
    }

  }
  deleteListFavoritos(pid, e) {
    e.target.classList.replace('star--gold', 'star--black')

    this.carrerasService.deleteFavorite(
      pid,
>>>>>>> develop
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()
<<<<<<< HEAD
    })
  }else{
    this.paintStarFavorites()
  }

=======

      })
  }

  postFavoritos(pid, e) {
    e.target.classList.replace('star--black', 'star--gold')
    this.carrerasService.postFavorite(
      pid,
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()
      })
>>>>>>> develop
  }


  paintStarFavorites() {

    this.carrerasService.GetFavorite(
<<<<<<< HEAD
    this.tokenUsuario
    ).then((res)=>{
      this.listFavorite= res
     console.log(this.listFavorite)
     return this.visible=this.listFavorite.favoritosCarreras
=======
      this.tokenUsuario
    ).subscribe((res) => {
      this.listFavorite = res;
      this.cargando = false
      this.carrerasVer = true
    })
  }

  estoyEnFav(id) {

    this.estoyFav = false;
    this.listFavorite.forEach(element => {
      if (element.id_Carreras === id) {
        this.estoyFav = true;
      }

>>>>>>> develop
    })
    return this.estoyFav


  }

  OnlyUsers() {

    if (this.tokenUsuario == null) {
      return true
    } else {
      return false
    }
  }



}
