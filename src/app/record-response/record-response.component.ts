import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-record-response',
  templateUrl: './record-response.component.html',
  styleUrls: ['./record-response.component.scss']
})
export class RecordResponseComponent implements OnInit {

  responses = [
    {id: 0, flagged: false, status: "in-progress"},
    {id: 1, flagged: false, status: "incomplete"},
    {id: 2, flagged: false, status: "incomplete"}
    ];
  currentResponse = 0;
  showRecording = true;

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

  // Option number 2
  @HostListener('window:mousedown', ['$event'])
    downEvent(event: MouseEvent) {
      if (event.button === 0 && this.currentResponse < 3) {
        this.responses[this.currentResponse].status = "completed";
        this.currentResponse+=1;
        this.showRecording = false;
      } else {
          this.router.navigate(['record/view'], {skipLocationChange: false});
          return;
      }
    }

  //mouse up to start recording
  @HostListener('window:mouseup', ['$event'])
  upEvent(event: MouseEvent) {
    console.log("up event");
    if (event.button === 0) {

      if (this.currentResponse < 3) {
        this.responses[this.currentResponse].status = "in-progress";
        this.showRecording = true;
      }
      // check to see if finished recording third response
      console.log(this.currentResponse);
    }
  }

  @HostListener('window: keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (this.currentResponse === 3) {
      if (parseInt(event.key) >= 1 || parseInt(event.key) <= 3) {
        let res = this.responses[parseInt(event.key)-1];
        if (res.flagged) {
          res.flagged = false;
        } else {
          res.flagged = true;
        }
      }
    }
  }
}
