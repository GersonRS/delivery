import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, IonSlides, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from './../../../components/cart/cart.component';
import { EstablishmentService } from './../../../services/establishment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
    }
  };

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public modalController: ModalController,
    public route: Router,
    public establishmentService: EstablishmentService,
    public routerOutlet: IonRouterOutlet,
    public cartService: CartService
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

}
