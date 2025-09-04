import { Injectable } from "@angular/core";
import { GitHubUser } from "../interfaces/git-hub-user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GithubApi {

  private apiURL: string = 'https://api.github.com/users/osvaldx';

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<GitHubUser> {
    return this.httpClient.get<GitHubUser>(this.apiURL);
  }

}
