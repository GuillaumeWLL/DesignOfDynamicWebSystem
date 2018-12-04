import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable()

export class ApiService {

  user: User;

  constructor(private httpClient: HttpClient) {}

  getUser() {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(`${environment.api_url}/myAccount`)
        .subscribe(
          (response) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            console.log('error while retrieving profile data');
          }
        );
    });
  }

  updateProfile(username: string,
         email: string,
         password: string, level: number) {

    this.httpClient
      .put(`${environment.api_url}/myAccount/edit`, {username, email, password, level}  )
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
  }
}
