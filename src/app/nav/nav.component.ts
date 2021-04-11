import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  envName= environment.name;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


   // private roles: string[] = [];
   private subscriptions: string[] = [];
   isLoggedIn = false;
   showMasterBoard = false;
   showResellerBoard = false;
   showModeratorBoard = false;
   username?: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;
      this.subscriptions = user.user.subscription;

      // visualizzo le board in base al ruolo
      // this.showMasterBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      console.log("this.subscriptions: ", user.user);
      this.showMasterBoard = this.subscriptions.includes('master');
      this.showResellerBoard = this.subscriptions.includes('reseller');
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
