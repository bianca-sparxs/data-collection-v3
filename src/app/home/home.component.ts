import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db: DatabaseService) {}

  validateUser() {
    // console.log(document.getElementById("userIDInput").value);
    this.db.validateUser((<HTMLInputElement>document.getElementById("userIDInput")).value);
  }
  ngOnInit(): void {
  }

}
