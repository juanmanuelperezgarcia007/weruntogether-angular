import { Router, NavigationEnd } from '@angular/router';
import { CarrerasService } from './../carreras-service';
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
  mensajeCont: number
  carrerasVer: boolean;
  tokenUsuario = localStorage.getItem('token')
  constructor(private carrerasService: CarrerasService, public router: Router) { }
  arrayCarrerFav = []
  ngOnInit() {
    this.getFav()
    // this.paintStarFavoritesCount()
  }
  getFav() {
    this.carrerasService.GetFavorite(
      this.tokenUsuario
    ).subscribe((res) => {
      this.listFavorite = res;
      this.cargando = false
      this.carrerasVer = true

      for (let index = 0; index < this.listFavorite.length; index++) {
        let id = this.listFavorite[index].id_Carreras
        this.carrerasService.getFavCarrer(id
        ).subscribe((resFav) => {

          this.arrayCarrerFav.push(resFav[0])

        })
      }

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
  deleteListFavoritos(pid, e) {
    e.target.classList.replace('star--gold', 'star--black')
    console.log(e.path[3])
    e.path[3].classList.add('none')
    console.log(this.listFavorite.length)
    if (this.listFavorite.length === 1) {

      this.router.navigate(['carreras']
      )
    }

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
  // paintStarFavoritesCount() {

  //   this.carrerasService.GetFavoriteCount(
  //     this.tokenUsuario
  //   ).subscribe((res) => {
  //     this.listFavorite = res;
  //     console.log(this.listFavorite[0].count)


  //   })
  // }

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
