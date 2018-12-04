import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  hide = true;
  authStatus: boolean;
  authForm: FormGroup;

  username = new FormControl('', [Validators.required]);

  password = new FormControl('', [Validators.required]);


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.authForm = this.formBuilder.group( {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }
  onLogIn() {
    const formValue = this.authForm.value;
    this.authService.logIn(
      formValue['username'],
      formValue['password']).then(
        r => {
          console.log(r);
          this.router.navigate(['/']);
        }
    );
  }
}
