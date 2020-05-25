import { environment } from './../../../environments/environment';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public router: Router,
    public storage: Storage
  ) {}

  startApp() {
    this.router
      .navigateByUrl('/auth', { replaceUrl: true })
      .then(() => this.storage.set(environment.TUTORIAL_KEY, true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get(environment.TUTORIAL_KEY).then(res => {
      if (res === true) {
        this.router.navigateByUrl('/auth', { replaceUrl: true });
      }
    });
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
  }

}
