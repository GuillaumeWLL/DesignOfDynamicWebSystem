import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn} from '@angular/forms';
import { AbstractControl} from '@angular/forms';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RegisterService} from '../services/register.service';

export interface Mode {
  name: string;
  rules: string;
}

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  hide = true;
  userForm: FormGroup;

  modes: Mode[] = [
    {name: 'Zen', rules: 'Zen rules' },
    {name: 'Speed-run', rules: 'Speed-run rules' },
    {name: 'Hardcore', rules: 'Hardcore rules' }
  ];

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.userForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      modeControl: ['', [Validators.required]]
      }, {validator: this.checkPasswords }
    );
  }
  getRules() {
    const selectMode = this.userForm.value['modeControl'];
    return selectMode.rules;
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  onSignIn() {
    const formValue = this.userForm.value;
    this.registerService.signIn(
      formValue['username'],
      formValue['email'],
      formValue['password'],
      2);

  }
}
