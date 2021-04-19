import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoFront';
  public logedInUser: User;
  public foundUsers: User[];

  public displayedColumns: string[] = ['firstName', 'lastName', 'cnp', 'email', 'role'];
  public searchCnp;
  public searchName;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.foundUsers = [];
    // this.logIn(1210418000000); //admin
    // this.logIn(1210418000016); //viewer
  }

  public logIn(cnp: number) {
    this.userService.findUser(cnp).subscribe(
      (response: User) => {
        this.logedInUser = response;
        this.findUsers(null, null, 0);
      },
      (error: HttpErrorResponse) => {
        alert("Authentification failed");
      }
    )
  }

  public findUsers(cnp: number, name: string, page: number) {
    this.userService.findUsers(cnp, name, page).subscribe(
      (response: User[]) => {
        this.foundUsers = response;
      },
      (error: HttpErrorResponse) => {
        alert("Search failed");
      }
    )
  }

  public isAdmin() {
    return (this.logedInUser.role == 'ADMIN')
  }

  public resetSearch(): void {
    this.searchCnp=null;
    this.searchName=null;
  }

}
