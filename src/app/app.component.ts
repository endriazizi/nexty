/**
 * App Component
 * This component is the root Component of our Angular application,
 * it defines the root tag: <app-root></app-root> that we use in index.html.
 *  app.component.ts
 * 
 * First, we check isLoggedIn status using TokenStorageService, if it is true,
 * we get user’s roles and set value for showAdminBoard & showModeratorBoard flag.
 * They will control how template navbar displays its items.
 * 
 * The App Component template also has a Logout button link that call logout() method and reload the window.
 * 
 * app.component.html
 */

import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  envName= environment.name;
  title= 'nexty';
 // private roles: string[] = [];
  private subscriptions: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;
      this.subscriptions = user.user.subscription;

      // visualizzo le board in base al ruolo
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      console.log("this.subscriptions: " , user.user);
      this.showAdminBoard = this.subscriptions.includes('master');
      this.showModeratorBoard = this.subscriptions.includes('ROLE_MODERATOR');

      //this.username = user.username;
      this.username = user.user.name;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
