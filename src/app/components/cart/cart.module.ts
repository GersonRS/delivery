import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CartComponent],
  exports: [CartComponent]
})
export class CartModule { }
