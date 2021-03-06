import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/user.model';
import {getOrCreateCurrentQueries} from '@angular/core/src/render3/instructions';

export interface Mode {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;
  selectedMode: number;
<<<<<<< HEAD
  user = { "user_id":0, "user_name":"" , "user_mail":"" , "user_level":0, "user_status":1 , "user_password":"" };
=======
  user ={"user_id": 0, "user_name": "", "user_mail": "", "user_password": "", "user_level": 1, "user_status": 1, "user_progression": ""};
>>>>>>> Front-End

  modes: Mode[] = [
    {value: 1, viewValue: 'Zen'},
    {value: 2, viewValue: 'Speed-run'},
    {value: 3, viewValue: 'Hardcore'}
  ];

  changePassword: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.apiService.getUser().then( (response) => {
      this.user = response;
    });
<<<<<<< HEAD
    this.selectedMode = this.user.user_level;
  }

  ngOnInit() {
=======

  }

  ngOnInit() {

>>>>>>> Front-End
    this.userForm = this.formBuilder.group( {
        email: ['', [Validators.email]],
        username: ['', []],
        oldPassword: ['', []],
        newPassword: ['', []],
        confirmNewPassword: [],
      }, {validator: this.checkPasswords }
    );
    this.changePassword = false;
    this.selectedMode = this.user.user_level;
  }

  getCurrUserInfos(): any {
    this.apiService.getUser().then( response => {
      console.log(response);
      return response;

    });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmNewPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onUpdate() {
    this.user = this.getCurrUserInfos();
    const formValue = this.userForm.value;
    if ( formValue['username'] === '' ) {
      formValue['username'] = this.user.user_name;
    }
    if ( formValue['email'] === '' ) {
      formValue['email'] = this.user.user_mail;
    }
    if (this.changePassword === true) {
      if (formValue['oldPassword'] === formValue['newPassword']) {
        this.apiService.updateProfile(
          formValue['username'],
          formValue['email'],
          formValue['oldPassword'],
          this.selectedMode);
      } else {
        this.apiService.updateProfile(
          formValue['username'],
          formValue['email'],
          formValue['newPassword'],
          this.selectedMode);
      }
    } else {
      this.apiService.updateProfile(
        formValue['username'],
        formValue['email'],
        this.user.user_password,
        this.selectedMode);
    }
    console.log(formValue['username']);
    console.log(formValue['email']);
    console.log(formValue['oldPassword']);
    console.log(this.selectedMode);
    console.log(this.user.user_password);


  }
  togglePassword() {
    this.changePassword = !this.changePassword;
  }

}
