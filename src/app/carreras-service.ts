import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CarrerasService {
  // url = 'http://back.weruntogether.es/api/carreras'
  // url_filter = 'http://back.weruntogether.es/api/carreras/filtrarCarreras'
  url='http://localhost:3000/api/carreras'
  url_filter='http://localhost:3000/api/carreras/filtrarCarreras'


  constructor(private httpClient: HttpClient, router: Router) {
  }

  getAllCarreras() {
    return this.httpClient.get(`${this.url}`).toPromise()

  }

  getFilters(pmin, pmax, pdate, ptype, pcity, pprovincia) {
    return this.httpClient.post(`${this.url_filter}`, { min: pmin, max: pmax, date: pdate, type: ptype, city: pcity, provincia:pprovincia }).toPromise()
  }



}