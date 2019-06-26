import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  url: string
  url_guardar: string
  url_pregunta: string
  url_comentarios: string
  url_datos:any
  mostrar = true
  noMostrar = false
  constructor(private httpClient: HttpClient) {
    
    // this.url = 'https://back.weruntogether.es/api/foro'
    // this.url_pregunta = 'https://back.weruntogether.es/api/foro/pregunta'
    // this.url_guardar = 'https://back.weruntogether.es/api/foro/respuesta'
    // this.url_datos = 'https://back.weruntogether.es/api/foro/datos'
    // this.url_comentarios = 'https://back.weruntogether.es/api/foro/guardarComentariosForo'
    
    this.url = 'http://localhost:3000/api/foro'
    this.url_pregunta = 'http://localhost:3000/api/foro/pregunta'
    this.url_guardar = 'http://localhost:3000/api/foro/respuesta'
    this.url_datos = 'http://localhost:3000/api/foro/datos'
    this.url_comentarios = 'http://localhost:3000/api/foro/guardarComentariosForo'
  }

  getAllQuestions() {
    return this.httpClient.get<any>(`${this.url}/`).toPromise()

  }

  getPregunta(id) {
    console.log(id)
    return this.httpClient.get<any>(`${this.url_pregunta}/${id}`).toPromise()

  }

  loadData(pAllPreguntasId) {
    console.log(pAllPreguntasId)
    return this.httpClient.post<any>(`${this.url_datos}`, {
      fk_respuesta: pAllPreguntasId
    }).toPromise()
  }

  saveRespuesta(popciones, pAllPreguntasId) {
    console.log(popciones,pAllPreguntasId)
    return this.httpClient.post<any>(`${this.url_guardar}`, {
        fk_respuesta: pAllPreguntasId,
        respuesta: popciones
    }).toPromise()
  }
  

  guardarComentario(tokenUsuario,value,AllPreguntasId) {
    console.log(tokenUsuario,value,AllPreguntasId)
    return this.httpClient.post<any>(`${this.url_comentarios}`, {
      
      tokenUsuario:tokenUsuario,
      comentario: value,
      fk_respuesta: AllPreguntasId,
       
    }).toPromise()
  }

  pintarComentariosForo(AllPreguntasId) {
    return this.httpClient.post(`${this.url}/paintComentariosForo`, {
      fk_respuesta: AllPreguntasId

    }).toPromise()

  }
  
  toggleMostrar() {
    this.mostrar = !this.mostrar
    this.noMostrar = !this.noMostrar

  }
}
