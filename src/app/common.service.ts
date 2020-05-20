import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private localstorageService: LocalstorageService) { }

  OnlyUsers() {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    const OnlyUsers = tokenUser === null ? true : false;
    return OnlyUsers;
  }
}
