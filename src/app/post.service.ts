import { Injectable } from '@angular/core';
import { WeruntogetherComponent } from './weruntogether/weruntogether.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string
  postList: any

  constructor(private httpClient: HttpClient) {

    // this.url = 'https://back.weruntogether.es/api/quedadas'
    this.url = 'http://localhost:3000/api/quedadas'
   

  }
  agregarPost(pformularioDia, pformularioHora, pformularioDistancia, pformularioMensaje, platitude, plongitud) {
    console.log('entra en el servicio')
    let tokenVar = localStorage.getItem('token')
    return this.httpClient.post(`${this.url}/${'agregarPost'}`, {

      formularioDia: pformularioDia,
      formularioHora: pformularioHora,
      formularioDistancia: pformularioDistancia,
      formularioMensaje: pformularioMensaje,
      longitud: plongitud,
      latitude: platitude,
      token: tokenVar
    }).toPromise()


  }

  getAllPost(lon, lat) {

    return this.httpClient.post(`${this.url}/${'allPost'}`, {
      lat: lat,
      lon: lon
    })
      .toPromise()

  }

  filtersDistance(pdistance) {
    return this.httpClient.post(`${this.url}/${'filtrarPostDistancia'}`, {
      BuscadorDistancia: pdistance,
    }).toPromise()
  }

  filtersDate(pdate) {
    return this.httpClient.post(`${this.url}/${'filtrarPostDate'}`, {
      buscadorDia: pdate,
    }).toPromise()
  }

  getComentarios(id) {
    return this.httpClient.get<any>(`${this.url}/comentarios/${id}`).toPromise()

  }

  guardarComentario(ptoken, comentario, idruta) {
    return this.httpClient.post(`${this.url}/guardarComentarios`, {
      tokenUsuario: ptoken,
      comentarios: comentario,
      fk_eventos: idruta,
    }).toPromise()
  }

  pintarComentarios(pidEventos) {
    return this.httpClient.post(`${this.url}/paintComentarios`, {
      fk_eventos: pidEventos

    }).toPromise()

  }

  borrarComentarios(pid) {
    return this.httpClient.post(`${this.url}/deleteComentario`, {
      id: pid

    }).toPromise()

  }

  borrarPost(pid) {
    return this.httpClient.post(`${this.url}/deletePost`, {
      id: pid

    }).toPromise()

  }
}
