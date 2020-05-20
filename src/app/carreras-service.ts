import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RaceService {

  // online
  // url = 'https://back.weruntogether.es/api/carreras/WeekRace'
  // url_filter = 'https://back.weruntogether.es/api/carreras/filtrarCarreras'
  // url_favoritos = 'https://back.weruntogether.es/api/carreras/carrerasFavoritas'
  // url_getFilter = 'https://back.weruntogether.es/api/carreras/estrella'
  // url_favoritos_delete = 'https://back.weruntogether.es/api/carreras/quitarFavoritos'
  // url_fav = 'https://back.weruntogether.es/api/carreras/paintFav'
  // url_getFilterCount = 'https://back.weruntogether.es/api/carreras/estrellaCount'

  // local
  url = {
    WeekRace: 'http://localhost:3000/api/carreras/WeekRace',
    filter: 'http://localhost:3000/api/carreras/filtrarCarreras',
    favoritos: 'http://localhost:3000/api/carreras/carrerasFavoritas',
    getFilter: 'http://localhost:3000/api/carreras/estrella',
    favoritos_delete: 'http://localhost:3000/api/carreras/quitarFavoritos',
    fav: 'http://localhost:3000/api/carreras/paintFav',
    getFilterCount: 'http://localhost:3000/api/carreras/estrellaCount'
  };

  constructor(private httpClient: HttpClient, router: Router) {

  }

  getAllCarreras() {
    return this.httpClient.get(`${this.url.WeekRace}`).toPromise();

  }
  getFavCarrer(pid) {
    return this.httpClient.post(`${this.url.fav}`, { id: pid });
  }


  getFilters(form) {
    return this.httpClient.post(`${this.url.filter}`, { form }).toPromise();
  }

  postFavorite(pid, tokenusuario) {
    return this.httpClient.post(`${this.url.favoritos}`, { id_Carreras: pid, token: tokenusuario }).toPromise();
  }

  deleteFavorite(pid, tokenusuario) {
    return this.httpClient.post(`${this.url.favoritos_delete}`, { id_Carreras: pid, token: tokenusuario }).toPromise();
  }

  GetFavorite(tokenusuario) {
    return this.httpClient.post(`${this.url.getFilter}`, { token: tokenusuario });
  }

  GetFavoriteCount(tokenusuario) {
    return this.httpClient.post(`${this.url.getFilterCount}`, { token: tokenusuario });
  }



}
