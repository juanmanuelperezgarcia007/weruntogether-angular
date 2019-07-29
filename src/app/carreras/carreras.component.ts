
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
  carrerasAll: any
  favoritosVacio: boolean
  carrerasDistance: any
  carrerasType: any
  form: FormGroup;
  tokenUsuario = localStorage.getItem('token')
  listFavorite:any
  visible:boolean
  constructor(private carrerasService: CarrerasService, private loginService: LoginService) {
   this.visible=false
  }
 

  ngOnInit() {
    this.form = new FormGroup({
      min: new FormControl(''),
      max: new FormControl(''),
      type: new FormControl(''),
      date: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl(''),
    })

    this.mostrarCarreras()
  }
  mostrarCarreras() {
    this.carrerasService.getAllCarreras()
      .then((res) => {
      

        this.carrerasAll = res
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

    // this.form.reset()

  }

  postFavoritos(pid) {
    if(this.visible===false){
   
    this.carrerasService.postFavorite(
      !this.visible, 
      pid, 
      this.tokenUsuario)
      .then((res) => {
        
        this.paintStarFavorites()
    })
  }else{
    this.paintStarFavorites()
  }

  }
  paintStarFavorites() {
    this.carrerasService.GetFavorite(
    this.tokenUsuario
    ).then((res)=>{
      this.listFavorite= res
     console.log(this.listFavorite)
     return this.visible=this.listFavorite.favoritosCarreras
    })
  }



}
