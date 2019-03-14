import { Component, DoCheck } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { HttpService } from '../http.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  
  showNavbar = false;

  constructor(private router: Router,
              private httpService: HttpService,
              private breakpointObserver: BreakpointObserver) {}

  onLogout() {
    this.httpService.logout().subscribe();
    window.sessionStorage.removeItem('auth.credentials');
    this.router.navigate(['login']);
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
