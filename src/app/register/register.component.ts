/**
 * Register Component
 * This component binds form data (username, email, password) from template to AuthService.register() method 
 * that returns an Observable object.
 * register/register.component.ts
 */

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  // passo AuthService al costruttore
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}