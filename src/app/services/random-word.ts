import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WordFormat } from '../interfaces/randomW-format';

@Injectable({
  providedIn: 'root'
})
export class RandomWord {

  private apiURL: string = "https://random-words-api.vercel.app/word/spanish";
  
  constructor(private client: HttpClient) {}

  public getRandomWord() {
    return this.client.get<WordFormat[]>(this.apiURL);
  }

}
