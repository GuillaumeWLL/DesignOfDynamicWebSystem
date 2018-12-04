import {Component, Injectable, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable()

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  username: string;

  constructor( private authService: AuthService) {}

  ngOnInit() {
    this.authService.change.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.authService.loggedUser.subscribe(username => {
      this.username = username;
    });
  }

  logout() {
    console.log('here');
    this.authService.logOut(this.username);
  }

}
