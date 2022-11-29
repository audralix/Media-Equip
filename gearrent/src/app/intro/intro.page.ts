import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from '../guards/intro.guard';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
