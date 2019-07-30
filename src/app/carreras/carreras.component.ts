
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
  estoyFav: boolean[]
  estrella: boolean
  carrerasAll: any
  favoritosVacio: boolean
  carrerasDistance: any
  carrerasType: any
  form: FormGroup;
  favoritosLleno: boolean
  tokenUsuario = localStorage.getItem('token')
  listFavorite: any
  constructor(private carrerasService: CarrerasService, private loginService: LoginService) {
    this.estoyFav = []


  }
  public visible: boolean = true

  ngOnInit() {
    this.form = new FormGroup({
      min: new FormControl(''),
      max: new FormControl(''),
      type: new FormControl(''),
      date: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl(''),
    });

    this.mostrarCarreras();
    this.paintStarFavorites()
  }
  mostrarCarreras() {
    this.carrerasService.getAllCarreras()
      .then((res) => {
        console.log(res)

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
        console.log(res)

        this.carrerasAll = res
        if (this.carrerasAll == 0) {
          alert('No hay resultados vuelve a realizar una busqueda')
        }
      })

    // this.form.reset()

  }

  postFavoritos(pid, id) {
    console.log(id)
    this.paintStarFavorites()
    this.carrerasService.postFavorite(
      pid,
      this.visible,
      this.tokenUsuario)
      .then((res) => {

        this.paintStarFavorites()
        // this.paintStar(id)
      })


  }
  paintStarFavorites() {
    this.carrerasService.GetFavorite(
      this.tokenUsuario
    ).then((res) => {
      this.listFavorite = res;
      this.estoyEnFav();
      console.log(this.listFavorite);

    })


  }

  estoyEnFav() {


    for (let index = 0; index < this.carrerasAll.length; index++) {
      debugger
      if (this.listFavorite.includes(this.carrerasAll[index].id)) {
        this.estoyFav.push(true);
      } else {
        this.estoyFav.push(false);
      }
    }
    console.log(this.estoyFav)
  }



}
