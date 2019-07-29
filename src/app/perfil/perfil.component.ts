import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  arrUser: []
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.editUser(this.loginService.token).then(res => {

      this.form = new FormGroup({
        nombre: new FormControl(res['nombre'], Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),

        apellidos: new FormControl(res['apellidos'], Validators.pattern(/[a-zA-Z Á-Úá-ú][^1234567890]+$/)),

        usuario: new FormControl(res['usuario']),

        provincia: new FormControl(res['provincia']),

        poblacion: new FormControl(res['poblacion']),

        email: new FormControl(res['email'], Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)),
      })
    })

  }

  updateSubmit() {

    this.loginService.updateUser(this.form.value.nombre, this.form.value.apellidos, this.form.value.email, this.form.value.usuario, this.form.value.provincia, this.form.value.poblacion)
      .then((res) => {
        alert('Perfil actualizado')

      })

  }

  delUser() {
    this.loginService.deleteUser()
      .then((res) => {
        alert('Usuario Borrado')
        this.loginService.cerrarSesion()

      })
  }
}
