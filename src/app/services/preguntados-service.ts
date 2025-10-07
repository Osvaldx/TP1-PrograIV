import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private jsonUrl = 'assets/games/preguntados.json';

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get(this.jsonUrl);
  }
}
