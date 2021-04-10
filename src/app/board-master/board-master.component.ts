/**
 * Protected Components
 * These Components are role-based. But authorization will be processed by back-end.
 * We only need to call UserService methods:
 * getUserBoard()
 * getModeratorBoard()
 * getAdminBoard()
 * Here is an example for BoardMasterComponent.
 * BoardModeratorComponent & BoardUserComponent are similar.
 * 
 *  board-master/board-master.component.ts
*/

import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';

import { Kit } from 'src/app/models/kit.model';

@Component({
  selector: 'app-board-master',
  templateUrl: './board-master.component.html',
  styleUrls: ['./board-master.component.css']
})
export class BoardMasterComponent implements OnInit {

  
  Kits?: Kit[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    this.userService.getAdminBoard().subscribe(
      
      data => {
        this.Kits = data;
        // console.log("content", this.content);
        console.log(data);

         
      },
      err => {
        this.Kits = JSON.parse(err.error).message;
      }
    );
  }
}