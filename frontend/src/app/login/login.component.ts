import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showAlert = false;
  authenticated = false;

  constructor(private router: Router, private httpService: HttpService) { }

  onLogin(username: string, password: string) {

    const loginCallback = (authenticated) => {
      if (authenticated) {
        const base64 = btoa(username + ':' + password);
        window.sessionStorage.setItem('auth.credentials', base64);
      } else {
        this.showAlert = true;
      }
      this.router.navigate(['../department']);
    };

    this.httpService.login({ username, password }).subscribe(
      (response) => {
        loginCallback(response.json().isValid);
      }
    );
  }
}
