import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  getLocalstorage(key: string) {
    return localStorage.getItem(key);
  }
  postLocalstorage(key: string, data: string) {
    return localStorage.setItem(key, data);
  }
}
