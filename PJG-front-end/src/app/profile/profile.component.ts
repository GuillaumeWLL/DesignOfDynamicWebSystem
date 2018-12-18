import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

<<<<<<< HEAD
  user =  {"user_id":0 , "user_name":"", "user_level":0, "user_mail":"" , "user_progression":0, "user_password":"", "user_status":1} ;

  constructor(private apiService: ApiService) {
	this.apiService.getUser().then( (response) => {
		this.user = response;
	 });
	}

  ngOnInit() {
   // this.apiService.getUser().then( (response) => {
    // this.user = response;
    // console.log(this.user.user_name);
//     }
//   );
=======
  user ={"user_id": 0, "user_name": "", "user_mail": "", "user_password": "", "user_level": 0, "user_status": 1, "user_progression": "", "user_pic":""};

  constructor(private apiService: ApiService) {
    this.apiService.getUser().then( (response) => {
        console.log(response);
        this.user = response;
      }
    );
  }

  ngOnInit() {

>>>>>>> Front-End
  }
}
