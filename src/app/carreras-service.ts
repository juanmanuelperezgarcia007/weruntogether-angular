import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CarrerasService {
  url = 'https://back.weruntogether.es/api/carreras/WeekRace'
  url_filter = 'https://back.weruntogether.es/api/carreras/filtrarCarreras'
  url_favoritos='https://back.weruntogether.es/api/carreras/carrerasFavoritas'
  url_getFilter='https://back.weruntogether.es/api/carreras/estrella'
  // url='http://localhost:3000/api/carreras/WeekRace'
  // url_filter='http://localhost:3000/api/carreras/filtrarCarreras'
  // url_favoritos='http://localhost:3000/api/carreras/carrerasFavoritas'
  // url_getFilter='http://localhost:3000/api/carreras/estrella'

  constructor(private httpClient: HttpClient, router: Router) {
  }

  getAllCarreras() {
    return this.httpClient.get(`${this.url}`).toPromise()

  }

  getFilters(pmin, pmax, pdate, ptype, pcity, pprovince) {
    console.log(typeof pprovince)
    return this.httpClient.post(`${this.url_filter}`, { min: pmin, max: pmax, date: pdate, type: ptype, city: pcity, province: pprovince}).toPromise()
   
  }

  postFavorite(pid,ptrue,tokenusuario){
    return this.httpClient.post(`${this.url_favoritos}`,{ favoritosCarreras: ptrue, id_Carreras: pid, token:tokenusuario }).toPromise()
  }

  GetFavorite(tokenusuario){
    console.log(tokenusuario)
    return this.httpClient.post(`${this.url_getFilter}`,{token:tokenusuario}).toPromise()
  }
}