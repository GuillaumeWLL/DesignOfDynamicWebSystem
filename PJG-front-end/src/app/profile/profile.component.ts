import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUser().then( (response) => {
     console.log(response);
     this.user = response;
     }
   );
  }
}
