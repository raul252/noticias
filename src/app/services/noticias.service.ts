import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPages = 0;

  categoriaActual = '';
  categoriaPage = 0;

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }
  

  constructor( private http:HttpClient) { 
    this.headLinesPages++;
    console.log(this.headLinesPages);
  }

  getTopHeadlines() {
    return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=us&page=${this.headLinesPages }`);
  }

  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual == categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=de&category=${categoria}&page=${this.categoriaPage }&apiKey=9f7f6d34f72b49e8a7e0e9ce1296066f`)
  }
}
