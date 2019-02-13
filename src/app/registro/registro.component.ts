import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements 

OnInit {
  form : FormGroup;
  constructor() { }

  ngOnInit() {
    this.form= new FormGroup({
      nombre: new FormControl('', Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),
      apellidos: new FormControl('', Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),
      usuario: new FormControl(''),
      contraseña: new FormControl('', Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)),
      provincia: new FormControl(''),
      poblacion: new FormControl(''),
      email: new FormControl('',Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)),
    })
  }

}
