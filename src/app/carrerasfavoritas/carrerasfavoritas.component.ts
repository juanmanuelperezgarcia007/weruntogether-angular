import { Router } from '@angular/router';
import { RaceService } from '../carreras-service';
import { Component, OnInit } from '@angular/core';
import { Carrer } from '../models/carrer.model';
import { LocalstorageService } from '../localstorage.service';

@Component({

  selector: 'app-carrerasfavoritas',
  templateUrl: './carrerasfavoritas.component.html',
  styleUrls: ['./carrerasfavoritas.component.css']
})
export class CarrerasfavoritasComponent implements OnInit {

  listFavorite: any
  loading: boolean
  tokenUsuario = localStorage.getItem('token')
  showCarrer: boolean;
  constructor(
    private localstorageService: LocalstorageService,
    private carrerasService: RaceService,
    public router: Router) { }
  arrayCarrerFav = []
  listCarreraVacia: boolean;

  ngOnInit() {
    this.getFav();
  }

  getFav() {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    this.carrerasService.GetFavorite(tokenUser)
      .subscribe((listFavorite) => {
        this.listFavorite = listFavorite;
        this.loading = false;
        this.showCarrer = true;
        for (let index = 0; index < this.listFavorite.length; index++) {
          const id = this.listFavorite[index].id_Carreras;
          this.carrerasService.getFavCarrer(id)
            .subscribe((resFav) => this.arrayCarrerFav.push(resFav[0]));
        }
        this.listCarreraVacia = this.listFavorite.length === 0 ? true : false;

      });
  }

  selectFav(id, e) {
    this.paintStarFavorites();
    const estoyFav = this.estoyEnFav(id);
    if (estoyFav === true) {
      this.deleteListFavoritos(id, e);
    } else {
      this.postFavoritos(id, e);
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
    const tokenUser = this.localstorageService.getLocalstorage('token');
    this.changeClass(e)
    this.carrerasService.deleteFavorite(pid, tokenUser)
      .then((res) => {
        this.paintStarFavorites()
      })
  }

  postFavoritos(pid, e) {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    e.target.classList.replace('star--black', 'star--gold')
    this.carrerasService.postFavorite(
      pid,
      tokenUser)
      .then((res) => {
        this.paintStarFavorites()
      })
  }

  paintStarFavorites() {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    this.carrerasService.GetFavorite(tokenUser)
      .subscribe((carrerFavorites: Carrer[]) => {
        this.listFavorite = carrerFavorites;
        this.loading = false;
        this.showCarrer = true;
      });
  }


  estoyEnFav(id) {
    let estoyFav = false;
    this.listFavorite.forEach(element => {
      if (element.id_Carreras === id) {
        estoyFav = true;
      }
    })
    return estoyFav;


  }

  OnlyUsers() {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    const OnlyUsers = tokenUser === null ? true : false;
    return OnlyUsers;
  }

}
