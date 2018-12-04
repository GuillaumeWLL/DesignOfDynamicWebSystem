import { HttpClient } from '@angular/common/http';
import {post} from 'selenium-webdriver/http';
import {User} from '../models/user.model';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable()

export class RegisterService {

  isAuth = true;

  constructor(private httpClient: HttpClient) {}

  signIn(
    username: string,
    email: string,
    password: string,
    level: number) {

    this.httpClient
      .post(`${environment.api_url}/signin`, {username, email, password, level}  )
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
