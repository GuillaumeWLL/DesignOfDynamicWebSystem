import {HttpClient, HttpHeaders} from '@angular/common/http';
import {post} from 'selenium-webdriver/http';
import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { User } from '../models/user.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {LoginResultModel} from '../models/loginResult.model';


@Injectable()

export class AuthService {

  public currentUser: User;

  isAuth = true;



  constructor(private httpClient: HttpClient) {
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() loggedUser: EventEmitter<string> = new EventEmitter();

  logIn(
    username: string,
    password: string) {

    return new Promise<any>((resolve, reject) => {
      this.httpClient
        .post(`${environment.api_url}/login`, {username, password})
        .subscribe(
          (response) => {
            resolve(response);
            this.isAuth = true;
            this.change.emit(this.isAuth);
            this.loggedUser.emit(username);
            console.log('auth succeeded');
          },
          (error) => {
            console.log(error);
            console.log('did not go as expected...');
          }
        );
    });
  }

  logOut(username: string)/*: Observable<LoginResultModel>*/ {
    this.httpClient.post(`${environment.api_url}/logout`, {username}).subscribe(
      () => {
        console.log('logout succeeded');
        this.isAuth = false;
        this.change.emit(this.isAuth);
      },
      (error) => {
        console.log(' logout failed ');
      }
    );
  }
}
