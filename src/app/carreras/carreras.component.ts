import { Component, OnInit } from '@angular/core';
import { CarrerasService} from '../carreras-service'
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'

import { LoginService } from '../login.service';
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
 carrerasAll:any
 carrerasDistance:any
 carrerasType:any
 form : FormGroup;
  constructor(private carrerasService:CarrerasService, private loginService:LoginService) { }

  ngOnInit() {
    this.form= new FormGroup({
      min: new FormControl(''),
      max: new FormControl(''),
      type: new FormControl('' ),
      date: new FormControl(''),
      city: new FormControl(''),
      provincia: new FormControl('')
    })
    
    this.mostrarCarreras()
  }
  mostrarCarreras(){
    this.carrerasService.getAllCarreras()
    .then((res)=>{
      console.log(res)

      this.carrerasAll = res
    })
  
  }
 

  getFiltersRace(){
    this.carrerasService.getFilters(
      this.form.value.min,
      this.form.value.max,
      this.form.value.date,
      this.form.value.type,
      this.form.value.provincia,
      this.form.value.city)
    
    .then((res)=>{
      console.log(res)
      
      this.carrerasAll = res
      if(this.carrerasAll==0){
        alert('No hay resultados vuelve a realizar una busqueda')
      }
    })
    
    this.form.reset()

  }

  

}
