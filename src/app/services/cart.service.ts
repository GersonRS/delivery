import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Product } from './../models/product';
import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;
  private CART_KEY = 'cart_key';

  constructor(
    public storage: Storage,
    public toastController: ToastController
  ) {
    this.cart = {
      products: [],
      delivery_fee: [],
      total: 0
    };
  }

  get(): Cart {
    return this.cart;
  }

  length() {
    return this.cart.products.length;
  }

  async add(product: Product) {
    this.cart.products.push(product);
    const storageObs = from(this.storage.ready());

    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
