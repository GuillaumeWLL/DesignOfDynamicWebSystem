import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn} from '@angular/forms';
import { AbstractControl} from '@angular/forms';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  hide = true;
  registrationFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {}
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getMatchErrorMessage() {
    const userForm = this.emailFormGroup.value;

    if (userForm['password'] !== userForm['confirmPassword']){

    }
  }



  /*constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router ) { }*/



  /*initForm() {
    this.userForm = this.formBuilder.group( {
      firstName: ['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      drinkPreference:['', Validators.required],
      hobbies: this.formBuilder.array( [])
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getHobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobbie() {
    const newHobbyControl = this.formBuilder.control('', Validators.required);
    this.getHobbies().push(newHobbyControl);
  }*/
}
