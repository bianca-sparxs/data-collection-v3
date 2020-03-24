import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ElectronService } from '../core/services';



declare var MediaRecorder: any;

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

  mediaRecorder;
  recordedChunks = [];

  constructor(private router: Router, private route: ActivatedRoute, public electronService: ElectronService) { }


  ngOnInit() {
    let video = <HTMLVideoElement>document.getElementById('player');

    // srGet access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        window['stream'] = stream;
        video.srcObject = stream;
        video.play();
      });
    }
  }

  @HostListener('window:mousedown', ['$event'])
    downEvent(event: MouseEvent) {
      if (event.button === 0 && this.currentResponse < 3) {
        this.responses[this.currentResponse].status = "completed";
        this.currentResponse+=1;
        this.showRecording = false;
        this.stopRecording();

      } else {
          this.router.navigate(['record/view'], {skipLocationChange: false});
          return;
      }
    }

  //mouse up to start recording
  @HostListener('window:mouseup', ['$event'])
  upEvent(event: MouseEvent) {
    if (event.button === 0) {

      if (this.currentResponse < 3) {
        this.responses[this.currentResponse].status = "in-progress";
        this.showRecording = true;
        // if (this.currentResponse === 2) {
          this.startRecording();
        // }

      }

      if (this.currentResponse === 3) {
        this.downloadVideo(this.currentResponse);
      }
      // check to see if finished recording third response
      // console.log(this.currentResponse);
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

  // Methods for recording user video
  startRecording() {

    let options;

    if (!this.mediaRecorder) {
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        options = {mimeType: 'video/webm; codecs=vp9'};
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        options = {mimeType: 'video/webm; codecs=vp8'};
      } else {
        console.log("Cannot instantiate mediaRecorder");
      }

      try {
        this.mediaRecorder = new MediaRecorder(window['stream'], options);
        this.recordedChunks = [];
        console.log("MediaRecorder created", this.recordedChunks);
      } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
      }

      this.mediaRecorder.onstop = (event) => {
        console.log("Recorded chunks:", this.recordedChunks);
      };
      this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);

    }
    this.mediaRecorder.start(10);
    console.log("MediaRecorder started");
  }

  handleDataAvailable(event) {
    console.log("data available", event.data);
    if (event.data && event.data.size > 0) {
      this.recordedChunks.push(event.data);
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }

  downloadVideo(videoName) {
    const blob = new Blob(this.recordedChunks, {type: 'video/webm'});
    // console.log(`Saving ${JSON.stringify({ videoName, size: blob.size })}`);
    const self = this;

    if (this.electronService.isElectron) {
      let reader = new FileReader();
      reader.onload = function () {
        let buffer = new Buffer(reader.result as string);
        let path = self.electronService.remote.app.getPath("desktop") + "/" + videoName + ".webm";
        self.electronService.fs.writeFile(path, buffer, {}, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        })
      };
      reader.readAsArrayBuffer(blob);
    } else {
      for (let i = 0; i < this.recordedChunks.length; i++) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = i + ".webm";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    }
  }
}
