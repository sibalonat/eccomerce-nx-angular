import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password inserted could not find on the database'

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
    // this._login
  }

  private _initLoginForm()
  {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit()
  {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe((user) => {
      console.log(user);
      this.authError = false;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status !== 400) {
        this.authMessage = 'Error on the server, try again later';
      }
      this.authError = true;
    })
  }

  get loginForm()
  {
    return this.loginFormGroup.controls;
  }

}
