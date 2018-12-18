import { HttpClient } from '@angular/common/http';
import {post} from 'selenium-webdriver/http';
import {User} from '../models/user.model';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable()

export class RegisterService {

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
          console.log('User registered!! ');
        },
        (error) => {
          console.log('something went wrong');
        }
      );
  }
}
