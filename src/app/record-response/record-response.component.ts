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
    let video = <HTMLVideoElement>document.getElementById('userVideo');

    // srGet access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      let self = this;
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        window['stream'] = stream;
        video.srcObject = stream;
        video.play();

        self.initializeMediaRecorder();
      });
    }
  }

  initializeMediaRecorder() {
    let options;

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
    this.startRecording();
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
        for (let i = 0; i < 3; i++) {
          this.downloadVideo("response" + i, this.recordedChunks[i]);
        }
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
    this.mediaRecorder.start();
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

  downloadVideo(videoName, blobData) {
    // const blob = new Blob(this.recordedChunks, {type: 'video/webm'});
    // console.log(`Saving ${JSON.stringify({ videoName, size: blob.size })}`);
    const self = this;

    if (this.electronService.isElectron) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(blobData);
      reader.onload = function () {
        let data = new Buffer(reader.result as string);
        let path = self.electronService.remote.app.getPath("desktop") + "/" + videoName + ".webm";
        self.electronService.fs.writeFile(path, data, {}, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        })
      };
    }
    else {
      const url = window.URL.createObjectURL(blobData);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = videoName + ".webm";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  }
}
