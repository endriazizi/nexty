import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    // username: null,
    // password: null
    username: "master@master.it",
    password: "password"
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];
  roles: string='';

  // passo al costruttore AuthService e TokenStorageService
  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

              ngOnInit(): void {
                if (this.tokenStorage.getToken()) {
                  this.isLoggedIn = true;
                  this.roles = this.tokenStorage.getUser().roles;
                  console.log("AFTER LOGIN: ",this.roles = this.tokenStorage.getUser().user.subscription)
                  console.log("AFTER LOGIN - SUBSCRIPTION : ",this.roles = this.tokenStorage.getUser().user.subscription)
                }
              }
            
              onSubmit(): void {
                const { username, password } = this.form;
            
                this.authService.login(username, password).subscribe(
                  data => {
                    //this.tokenStorage.saveToken(data.accessToken);
                    this.tokenStorage.saveToken(data.token);
                    this.tokenStorage.saveUser(data);
            
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    // console.log(" &&&&&&&&&&&&&&&& : ",this.roles = this.tokenStorage.getUser().roles)
                    this.roles = this.tokenStorage.getUser().roles;
                    // console.log(" &&&&&&&&&&&&&&&& : ",this.roles);
                    // this.router.navigate(['BoardMasterComponent']); 
                    // return this.router.navigate(['/BoardMasterComponent']);

                    // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    // console.log("URL",);
                     
                    this.reloadPage();
                  },
                  err => {
                    this.errorMessage = err.error.message;
                    this.isLoginFailed = true;
                  }
                );
              }

              onSubmit2() {
                // some stuff
                this.router.navigate(['/BoardMasterComponent']);
              }
            
              reloadPage(): void {
                window.location.reload();
              }
            }