import { Router, NavigationEnd } from '@angular/router';
import { RaceService } from './../carreras-service';
import { Component, OnInit } from '@angular/core';

@Component({

  selector: 'app-carrerasfavoritas',
  templateUrl: './carrerasfavoritas.component.html',
  styleUrls: ['./carrerasfavoritas.component.css']
})
export class CarrerasfavoritasComponent implements OnInit {

  carrerFav: any
  estoyFav: boolean
  listFavorite: any
  cargando: boolean
  carrerasVer: boolean;
  tokenUsuario = localStorage.getItem('token')
  constructor(private raceService: RaceService, public router: Router) { }
  arrayCarrerFav = []
  CarreraVacia
  carreraLLena

  ngOnInit() {

    this.getFav()
  }
  getFav() {

    this.raceService.GetFavorite(

      this.tokenUsuario
    ).subscribe((res) => {

      this.listFavorite = res;
      this.cargando = false
      this.carrerasVer = true

      for (let index = 0; index < this.listFavorite.length; index++) {

        let id = this.listFavorite[index].id_Carreras
        this.raceService.getFavCarrer(id
        ).subscribe((resFav) => {

          this.arrayCarrerFav.push(resFav[0])

        })
      }


      if (this.listFavorite.length == 0) {
        this.CarreraVacia = true

        return this.CarreraVacia
      }

      this.carreraLLena = true
      return this.carreraLLena
    })
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

  changeClass(e) {
    e.target.classList.replace('star--gold', 'star--black')
    e.path[3].classList.replace('show', 'none')

    if (this.listFavorite.length == 1) {

      e.path[4].children[0].classList.replace('none', 'show')
    }
  }

  deleteListFavoritos(pid, e) {

    this.changeClass(e)
    this.raceService.deleteFavorite(

      pid,
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()

      })
  }

  postFavoritos(pid, e) {

    e.target.classList.replace('star--black', 'star--gold')
    this.raceService.postFavorite(
      pid,
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()
      })
  }


  paintStarFavorites() {

    this.raceService.GetFavorite(
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
