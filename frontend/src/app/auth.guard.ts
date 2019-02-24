import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const credentials = sessionStorage.getItem('auth.credentials');
    if (credentials) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}