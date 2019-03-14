import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'
import { LoginService } from '../login.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form : FormGroup;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.form= new FormGroup({
      nombre: new FormControl('', Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),
      apellidos: new FormControl('', Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),
      usuario: new FormControl(''),
      password: new FormControl('', Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)),
      provincia: new FormControl(''),
      poblacion: new FormControl(''),
      email: new FormControl('',Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)),
    })
  }
  onSubmit(){
    
    this.loginService.getForm(this.form.value.nombre,this.form.value.apellidos,this.form.value.email,this.form.value.usuario,this.form.value.password,this.form.value.provincia,this.form.value.poblacion)
    .then((res)=>{
     
    })
    console.log(this.form.value)
  }

}
