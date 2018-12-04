import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/user.model';
import {getOrCreateCurrentQueries} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;

  test: any;
  changePassword: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.test = { username: 'PJ', email: 'pj@gg.c', password: 'eee'};
    /*this.apiService.getUser().then( (response) => {
      this.test = response;
    });*/
    // a uncomment qd server active
    //this.apiService.getUser();
    this.userForm = this.formBuilder.group( {
        email: ['', [Validators.email]],
        username: ['', []],
        oldPassword: ['', []],
        newPassword: ['', []],
        confirmNewPassword: [],
      }, {validator: this.checkPasswords }
    );
    this.changePassword = false;
  }

  /*getCurrUserInfos() {
    this.test = this.apiService.getUser().then( r => {
      console.log(r);
    });
  }*/

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmNewPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onUpdate() {
    const formValue = this.userForm.value;
    if ( formValue['username'] === '' ) {
      formValue['username'] = this.test.username;
    }
    if ( formValue['email'] === '' ) {
      formValue['email'] = this.test.email;
    }
    if (this.changePassword === true) {
      if (formValue['oldPassword'] === formValue['newPassword']) {
        this.apiService.updateProfile(
          formValue['username'],
          formValue['email'],
          formValue['oldPassword'],
          2);
      } else {
        this.apiService.updateProfile(
          formValue['username'],
          formValue['email'],
          formValue['newPassword'],
          2);
      }
    } else {
      this.apiService.updateProfile(
        formValue['username'],
        formValue['email'],
        this.test.password,
        2);
    }
    console.log(formValue['username']);
    console.log(formValue['email']);
    console.log(formValue['oldPassword']);
    console.log(this.test.password);


  }
  togglePassword() {
    this.changePassword = !this.changePassword;
  }

}
