/**
 * App Routing Module
 * We configure the Routing for our Angular app in app-routing.module.ts.
 * Routes array is passed to the RouterModule.forRoot() method.
 * 
 * We’re gonna use <router-outlet></router-outlet> directive in the App Component 
 * where contains navbar and display Components (corresponding to routes) content.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardMasterComponent } from './board-master/board-master.component';
import { HomeMasterComponent } from './home-master/home-master.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { BoardResellerComponent } from './board-reseller/board-reseller.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home-master', component: HomeMasterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'master', component: BoardMasterComponent },
  { path: 'reseller', component: BoardResellerComponent },

  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'students-list', component: StudentsListComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
