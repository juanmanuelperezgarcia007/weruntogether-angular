import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticia } from './noticias.model';
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
 

  url='https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vamosacorrer.com%2Frss%2Ffeeds%2Frss.xml&api_key=lj7yztwgo6yhjw1fryekwgatwfwhvxzzyx3khlku&order_by=pubDate&order_dir=desc&count=12'
  constructor(private httpClient:HttpClient) {}

  getAllNoticiasPromise(){
    return this.httpClient.get<Noticia[]>(this.url).toPromise()
  
  }
}
