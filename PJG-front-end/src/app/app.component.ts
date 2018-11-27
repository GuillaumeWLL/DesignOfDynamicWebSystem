import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuth: boolean;

  constructor( private authService: AuthService) {
    this.isAuth = authService.isAuth;
    console.log('ca passe ici aussi');
    console.log(this.isAuth);
  }
}

