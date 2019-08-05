import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CarrerasService {
  // url = 'http://back.weruntogether.es/api/carreras'
  // url_filter = 'http://back.weruntogether.es/api/carreras/filtrarCarreras'
  url = 'http://localhost:3000/api/carreras/WeekRace'
  url_filter = 'http://localhost:3000/api/carreras/filtrarCarreras'
  url_favoritos = 'http://localhost:3000/api/carreras/carrerasFavoritas'
  url_getFilter = 'http://localhost:3000/api/carreras/estrella'
  url_favoritos_delete = 'http://localhost:3000/api/carreras/quitarFavoritos'
  url_fav = 'http://localhost:3000/api/carreras/paintFav'
  url_getFilterCount = 'http://localhost:3000/api/carreras/estrellaCount'

  constructor(private httpClient: HttpClient, router: Router) {
  }

  getAllCarreras() {
    return this.httpClient.get(`${this.url}`).toPromise()

  }
  getFavCarrer(pid) {
    return this.httpClient.post(`${this.url_fav}`, { id: pid })
  }


  getFilters(pmin, pmax, pdate, ptype, pcity, pprovince) {

    return this.httpClient.post(`${this.url_filter}`, { min: pmin, max: pmax, date: pdate, type: ptype, city: pcity, province: pprovince }).toPromise()

  }

  postFavorite(pid, tokenusuario) {

    return this.httpClient.post(`${this.url_favoritos}`, { id_Carreras: pid, token: tokenusuario }).toPromise()
  }

  deleteFavorite(pid, tokenusuario) {
    return this.httpClient.post(`${this.url_favoritos_delete}`, { id_Carreras: pid, token: tokenusuario }).toPromise()
  }

  GetFavorite(tokenusuario) {
    return this.httpClient.post(`${this.url_getFilter}`, { token: tokenusuario })
  }
  GetFavoriteCount(tokenusuario) {
    return this.httpClient.post(`${this.url_getFilterCount}`, { token: tokenusuario })
  }


  // GetFavorite(tokenusuario){
  //   console.log(tokenusuario)
  //   return this.httpClient.post(`${this.url_getFilter}`,{token:tokenusuario}).toPromise()
  // }
}