import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-record-session',
  templateUrl: './record-session.component.html',
  styleUrls: ['./record-session.component.scss']
})
export class RecordSessionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.route.children);
  }


  // Incomplete and not accurate; just basic set up of nested router
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Change page based on url
    let currentPage = this.router.url;
    if (event.key === " " || event.key === "Spacebar") {
      if (currentPage === "/record/view") {
        this.router.navigate(['response'], {relativeTo: this.route, skipLocationChange: true})
      } else {
        this.router.navigate(['view'], {relativeTo: this.route, skipLocationChange: true})
      }
    }
  }
  ngOnInit() {
  }

}
