import { Component, inject } from '@angular/core';
import { GithubApi } from '../../services/github-api';
import { GitHubUser } from '../../interfaces/git-hub-user';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-about',
  imports: [Header],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  private profile: GitHubUser | null = null;
  private GitHubService = inject(GithubApi);

  constructor() { }

  public getProfileData() {
    this.GitHubService.getData().subscribe((data) => { this.profile = (data) ? data : null });
  }

}
