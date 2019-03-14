import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
    noticias: any  []  
    noticia_selecionada:any
    
  constructor(private noticiasService:NoticiasService){
     this.noticiasService.getAllNoticiasPromise().then((res)=>{
     this.noticias=res['items']
     this.noticia_selecionada=this.noticias[0]
    })
    
  }

  selecionarNoticia(not){
    this.noticia_selecionada= not
  }

  ngOnInit() {
  
  }
 
}
