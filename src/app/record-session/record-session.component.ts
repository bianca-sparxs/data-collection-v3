import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-record-session',
  templateUrl: './record-session.component.html',
  styleUrls: ['./record-session.component.scss']
})

export class RecordSessionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
