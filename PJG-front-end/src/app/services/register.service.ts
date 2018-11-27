import { HttpClient } from '@angular/common/http';
import {post} from 'selenium-webdriver/http';
import {User} from '../models/user.model';
import {Injectable} from '@angular/core';


@Injectable()

export class RegisterService {

  isAuth = true;

  constructor(private httpClient: HttpClient) {}

  signIn(
    username: string,
    email: string,
    password: string,
    level: number) {

    const user = {
      username,
      email,
      password,
      level
    };
    console.log( user );
    this.httpClient
      .post('http://130.240.200.91:8080/signin', user )
      .subscribe(
        () => {
          console.log('Ca fonctionne !! ');
        },
        (error) => {
          console.log('ca marche pas');
        }
      );

    console.log('ok ca passe la');
    console.log( username );
    console.log( email );
    console.log( password );
    console.log( level );
  }
}
