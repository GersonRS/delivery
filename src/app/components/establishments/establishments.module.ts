import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EstablishmentsComponent } from './establishments.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [EstablishmentsComponent],
  exports: [EstablishmentsComponent]
})
export class EstablishmentsModule { }
