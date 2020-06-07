import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('foi');
  }

  ngOnDestroy() {
    console.log('destroi');
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
