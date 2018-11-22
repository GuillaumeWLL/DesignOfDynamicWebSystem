import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  hide = true;
  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }
 /* onLogIn() {
    this.authService.logIn().then(
      () => {
        console.log('Connexion reussie')
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['/']);
      }
    );
  }*/
  onLogOut() {
    this.authService.logOut();
    console.log( 'déconnexion reussie');
    this.authStatus = this.authService.isAuth;
  }
}
