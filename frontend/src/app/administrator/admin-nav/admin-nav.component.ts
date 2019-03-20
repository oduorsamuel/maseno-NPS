import { Component, DoCheck } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { HttpService } from '../../http.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements DoCheck {

  showNavbar = false;

  constructor(private router: Router,
              private httpService: HttpService,
              private breakpointObserver: BreakpointObserver) {}
              isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  onLogout() {
    this.httpService.logout().subscribe();
    window.sessionStorage.removeItem('auth.credentials');
    this.router.navigate(['admin']);
  }
  ngDoCheck() {
    const credentials = sessionStorage.getItem('auth.credentials');
    if (credentials) {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
  }
}
