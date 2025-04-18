import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_PATH } from '@sparrowmini/org-api';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sparrow-web-admin';

  menus = []
  apiBase = environment.apiBase
  onSearch($event: any) {
    if ($event.key === 'Enter') {
      this.router.navigate(['/admin/search'], { queryParams: { q: $event.target.value } })
      // console.log('Enter key pressed )', $event)
      // window.confirm('Enter key pressed')
    }
  }
  screenSize: number = 1024
  hasBackdrop = false
  mode: 'over' | 'push' | 'side' = 'side'
  opened = true
  curUser: any;
  isLogin = false
  constructor(
    public keycloakService: KeycloakService,
    private router: Router,
    private http: HttpClient,
  ) {

    // this.http.get(this.apiBase + '/menus/my').subscribe((res: any) => {
    //   this.menus = res
    // })
  }
  ngAfterViewInit(): void {
    this.keycloakService.loadUserProfile().then((user) => {
      this.curUser = user;
      this.isLogin = true
    })

    this.screenSize = window.innerWidth
    this.initSideBar()
    window.addEventListener('resize', () => {
      this.screenSize = window.innerWidth;
      this.initSideBar()
    });
  }

  initSideBar() {
    if (this.screenSize > 976) {
      this.hasBackdrop = false
      this.mode = 'side'
      this.opened = true
    } else {
      this.hasBackdrop = true
      this.mode = 'over'
      this.opened = false
    }
  }
}
