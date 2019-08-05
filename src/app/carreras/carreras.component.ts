
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
  favoritosLleno: boolean
  tokenUsuario = localStorage.getItem('token')
  listFavorite: any
  constructor(private carrerasService: CarrerasService, private loginService: LoginService) {
    this.carrerasVer = false
    this.cargando = true

    this.arrayFav = []
    // this.paintStarFavorites()


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

    this.paintStarFavorites()
    this.mostrarCarreras();

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

    this.form.reset()

  }
  selectFav(id, e) {
    this.paintStarFavorites()
    this.estoyEnFav(id)
    console.log(this.estoyFav)
    if (this.estoyFav === true) {
      this.deleteListFavoritos(id, e)
    } else {
      this.postFavoritos(id, e)
    }

  }
  deleteListFavoritos(pid, e) {
    e.target.classList.replace('star--gold', 'star--black')
    console.log(pid)

    this.carrerasService.deleteFavorite(
      pid,
      this.tokenUsuario)
      .then((res) => {
        this.paintStarFavorites()
        // this.paintStar(id)
      })
  }

  postFavoritos(pid, e) {
    console.log(pid)
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
      console.log(this.listFavorite)
      this.cargando = false
      this.carrerasVer = true
    })
  }

  estoyEnFav(id) {

    this.estoyFav = false;
    console.log(this.listFavorite)
    this.listFavorite.forEach(element => {
      if (element.id_Carreras === id) {
        this.estoyFav = true;
      }

    })
    return this.estoyFav


  }

  OnlyUsers() { }



}
