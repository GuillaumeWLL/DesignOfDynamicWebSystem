import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {"user_id":12,"user_name":"aaa","user_mail":"qsfs@sfs.Fr","user_password":"47bce5c74f589f4867dbd57e9ca9f808","user_level":3,"user_progression":null,"user_status":1};


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    //this.apiService.getUser().then( (response) => {
     //console.log(response);
     //this.user = response;
     //}
   //);
  }
}
