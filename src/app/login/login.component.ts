import {Component, HostListener, OnInit} from '@angular/core';
import {DatabaseService} from "../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users;
  public selectedName;
  constructor(private db: DatabaseService, private router: Router) {
    this.users = this.db.getUsers();
  }

  //loads user data and navigates to dashboard
  onAddAdminUsername(form) {
    //TODO store this somewhere so that the password page can send it along with the password.
    // let adminUser = form.value.user;
    this.router.navigate(['password']).then(nav => {
      console.log(nav);
    }, reason => {
      console.log(reason);
    })
  }

  ngOnInit(): void {
  }
}
