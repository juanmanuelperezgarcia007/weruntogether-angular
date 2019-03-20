import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed:boolean

  constructor(public loginService:LoginService) { }

  ngOnInit() {
    this.isCollapsed=true
  }
  closedSession(){
    this.loginService.cerrarSesion()
  }
}
