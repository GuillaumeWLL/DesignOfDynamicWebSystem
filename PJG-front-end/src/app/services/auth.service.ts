import { HttpClient } from '@angular/common/http';
import {post} from 'selenium-webdriver/http';

export class AuthService {

  isAuth = true;

 /* logIn(
    userName: string,
    password: string) {

    .post('http://localhost:8080/login', )
    return new Promise(
      (resolve, reject) => {
        this.(
          () => {
            this.isAuth = true;
            resolve(true);
          },
        );

      }
    );

  }*/

  logOut() {
    this.isAuth = false;
  }
}
