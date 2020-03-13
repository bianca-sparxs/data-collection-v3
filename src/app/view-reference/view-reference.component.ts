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
    var video = <HTMLVideoElement>document.getElementById('player');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
      });
    }
  }

  @HostListener('window:mouseup', ['$event'])
  keyEvent(event: MouseEvent) {
    this.router.navigate(['record/response'], {skipLocationChange: false});
  }

}
