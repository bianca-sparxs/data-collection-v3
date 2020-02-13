import {Component, Injectable, OnInit} from '@angular/core';
import { DatabaseService } from "../database.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class DashboardComponent implements OnInit {

  user;
  constructor( private db: DatabaseService, private route: ActivatedRoute) {}


  ngOnInit() {

    // If user is viewing dashboard via link, will load relevant data.
    // Todo: Think of better way to do this, as there is zero use for a login page if we have no concept of user session

    this.route.paramMap.subscribe(params => {
      this.db.loadUserData(params.get('username'));
      this.user = this.db.getUser();
    });
  }
}
