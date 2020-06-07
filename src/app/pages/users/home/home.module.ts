import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartModule } from './../../../components/cart/cart.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { EstablishmentsModule } from 'src/app/components/establishments/establishments.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CartModule,
    EstablishmentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
