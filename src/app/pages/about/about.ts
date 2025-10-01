import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { GithubApi } from '../../services/github-api';
import { GitHubUser } from '../../interfaces/git-hub-user';
import { DateTimeService } from '../../services/date-time-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  protected profile: GitHubUser | null = null;
  private GitHubService = inject(GithubApi);
  private DateTime = inject(DateTimeService);

  constructor(private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.getProfileData();
  }

  public getProfileData() {
    this.GitHubService.getData().subscribe((data) => {
      this.profile = (data) ? data : null
      this.change.detectChanges();
     });
  }
  // Utilizamos un Pipe y remplazamos este codigo q ya no sirve
  // public transformDate(d: string) {
  //   return this.DateTime.getDate(d);
  // }
}
