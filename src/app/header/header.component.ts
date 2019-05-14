import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed:boolean
  tokenUsuario: any
  noMostrarToken = false
  mostrarToken= true

  constructor(public loginService:LoginService) { }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token')
    this.isCollapsed=true
    console.log(this.tokenUsuario)
    this.toggleMostrarToken(this.tokenUsuario)
  }
  closedSession(){
    this.loginService.cerrarSesion()
    this.toggleMostrarToken(this.tokenUsuario)
    location.reload()
  }
  toggleMostrarToken(ptokenUsuario){
    if(this.tokenUsuario==null){
      this.noMostrarToken = false
      this.mostrarToken=true
      
      
    }else{
      this.noMostrarToken = true
      this.mostrarToken=false

    }
  }
}
