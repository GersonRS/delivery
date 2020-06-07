import { EstablishmentService } from './../../services/establishment.service';
import { Establishment } from './../../models/establishment';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonButton, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.scss'],
})
export class EstablishmentsComponent implements OnInit {

  establishments: Establishment[] = [];

  lengthFilter = null;
  btnFilter = false;
  filter = '';

  @Input() specialty: string;

  @ViewChild('filter', { static: true }) c1: IonButton;

  constructor(
    public establishmentService: EstablishmentService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.getEstablishments(null);
    console.log(this.specialty);
  }

  getEstablishments(event: any) {
    this.establishmentService.listWithPagination()
      .subscribe(
        response => {
          this.establishments = this.establishments.concat(response);
          if (event) {
            event.target.complete();
          }
        }
      );
  }

  goTo(id: number) {
    console.log(id);
  }

  openFilter() {
    // free delivery
    if (!this.btnFilter) {
      this.c1.color = 'danger';
      this.lengthFilter = 5;
      this.btnFilter = true;
    }
    else {
      this.c1.color = 'light';
      this.lengthFilter = null;
      this.btnFilter = false;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ordenar por:',
      cssClass: 'ordenation',
      buttons: [{
        text: 'Ordenação padrão',
        icon: 'swap-vertical-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Preço',
        icon: 'cash-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Tempo de entrega',
        icon: 'stopwatch-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
