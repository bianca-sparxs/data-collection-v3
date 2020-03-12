import {Component, HostListener, OnInit} from '@angular/core';
import {DatabaseService} from "../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  users;
  public selectedName;
  constructor(private db: DatabaseService, private router: Router) {
    this.users = this.db.getUsers();
  }

  //loads user data and navigates to dashboard
  login(form) {
    let user = form.value.user;
    this.db.loadUserData(user);
    this.router.navigate(['dashboard']).then(nav => {
      console.log(nav);
    }, reason => {
      console.log(reason);
    })
  }

  // calls database service createUser with the inputted username
  // currently depreciated
  createUser() {
    let username = (<HTMLInputElement>document.getElementById("userIDInput")).value;
    this.db.createUser(username);
    this.router.navigate(['dashboard']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err);
    });

  }

  // Allows users to dismiss modal by clicking outside of the modal box
  // @HostListener('window:click', ['$event'])
  // handleClick(event: MouseEvent) {
  //   if (event.target == document.getElementById('newUserModal')) {
  //     document.getElementById('newUserModal').style.display = "none";
  //   }
  // }

  ngOnInit(): void {
  }
}
