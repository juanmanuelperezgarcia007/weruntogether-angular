import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { RaceService } from '../carreras-service'
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
  listFavorite: any
  constructor(private carrerasService: RaceService, private loginService: LoginService) {
    this.carrerasVer = false
    this.cargando = true

    this.arrayFav = []
    // this.paintStarFavorites()


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
        this.carrerasAll = res;
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
        this.carrerasAll = res
        if (this.carrerasAll == 0) {
          alert('No hay resultados vuelve a realizar una busqueda')
        }
      })

    this.form.reset()

  }
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
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()

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
  }


  paintStarFavorites() {

    this.carrerasService.GetFavorite(
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
