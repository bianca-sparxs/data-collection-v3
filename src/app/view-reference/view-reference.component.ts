import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-reference',
  templateUrl: './view-reference.component.html',
  styleUrls: ['./view-reference.component.scss']
})
export class ViewReferenceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public player: any;
  public videoId: any;

  initAPI() {
    if (window['YT']) {
      this.createPlayer();
      return;
    }

    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.createPlayer();
  }

  createPlayer() {
    this.player = new window['YT'].Player('player', {
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        fs: 0,
        playsinline: 1,
        origin: window.location.origin
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    let YTP = event.target;
    let rewindTO;
    if (event.data === 1) {
      var remains = YTP.getDuration() - YTP.getCurrentTime();
      if (rewindTO)
        clearTimeout(rewindTO);
        rewindTO = setTimeout(function () {
        YTP.seekTo(0);
      }, (remains - 0.1) * 1000);
    }
  }

  ngOnInit() {

    this.videoId = 'sKEGOtW4ayA';
    this.initAPI();

    let userVideo = <HTMLVideoElement>document.getElementById('userVideo');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        userVideo.srcObject = stream;
        userVideo.play();
      });
    }
  }

  @HostListener('window:mousedown', ['$event'])
  keyEvent(event: MouseEvent) {
    this.router.navigate(['record/response'], {skipLocationChange: false});
  }

}
