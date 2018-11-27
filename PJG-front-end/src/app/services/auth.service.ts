import { HttpClient } from '@angular/common/http';
import {post} from 'selenium-webdriver/http';
import {Injectable} from '@angular/core';


@Injectable()

export class AuthService {

  isAuth = false;

  constructor(private httpClient: HttpClient){}

  logIn(
    username: string,
    password: string) {

    const user = {
      username,
      password
    }
    this.httpClient
      .post('http://130.240.200.91:8080/login', user )
      .subscribe(
        () => {
          console.log('Ca fonctionne !! ');
          this.isAuth = true;

        },
        (error) => {
          console.log('ca marche pas');
        }
      );
    console.log('ok ca passe la');
    console.log( username );
    console.log( password );
  }
  logOut() {
    this.isAuth = false;
  }
}
