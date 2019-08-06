import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias: any[]
  noticia_selecionada: any
  i: number
  cargando: boolean
  mostrar: boolean
  fotoSeleccionada: any
  noticiasver: boolean

  constructor(private noticiasService: NoticiasService) {
    this.mostrar = false
    this.i = 0
    this.cargando = true
    this.noticiasver = false
    this.noticiasService.getAllNoticiasPromise().then((res) => {
      this.cargando = false
      this.noticiasver = true
      this.noticias = res['items']

      this.noticia_selecionada = this.noticias[0]
    })

  }

  selecionarNoticia(not, evento) {
    this.noticia_selecionada = not;
    this.fotoSeleccionada = evento.target.id;
    this.mostrar = true

  }



  ngOnInit() {

  }

}
