
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
    this.estoyFav = []
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

  postFavoritos(pid) {
    console.log(pid)
    // this.paintStarFavorites()
    this.carrerasService.postFavorite(
      pid,
      this.visible,
      this.tokenUsuario)
      .then((res) => {


        // this.paintStar(id)
      })


  }


  paintStarFavorites() {
    this.carrerasService.GetFavorite(
      this.tokenUsuario
    ).subscribe((res) => {
      this.listFavorite = res;

      this.cargando = false
      this.carrerasVer = true
      // this.changeObjArray()
    })


  }

  // changeObjArray() {

  //   for (let index = 0; index < this.listFavorite.length; index++) {
  //     this.arrayFav.push(this.listFavorite[index])

  //   }

  //   console.log(this.arrayFav)
  // }
  estoyEnFav(id) {
    console.log(id)
    // this.estoyFav = []
    let estoyFav = false;
    this.listFavorite.forEach(element => {
      if (element.id_Carreras === id) {
        estoyFav = true;
        // this.estoyFav.push(true)
      }
      // else {
      //   this.estoyFav.push(false)
      // }
    })
    return estoyFav;

    // console.log(this.estoyFav)
  }




}
