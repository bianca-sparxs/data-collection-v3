import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-reference',
  templateUrl: './view-reference.component.html',
  styleUrls: ['./view-reference.component.scss']
})
export class ViewReferenceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  @HostListener('window:mouseup', ['$event'])
  keyEvent(event: MouseEvent) {
    this.router.navigate(['record/response'], {skipLocationChange: false});
  }

}
