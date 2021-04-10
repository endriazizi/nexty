import { Student } from './../../shared/student';
import { User } from './../../shared/user';
// import { ApiService } from './../../shared/api.service';
import { ApiServiceUser } from './../../shared/api.service.user';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  UserData: any = [];
  dataSource!:  MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];
  displayedColumns: string[] = ['id', 'email', 'subscription', 'action'];

  constructor(private studentApi: ApiServiceUser) {
    this.studentApi.GetUsers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteStudent(index: number, e:any){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe()
    }
  }

}