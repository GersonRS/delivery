import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonButton, IonContent, AlertController } from '@ionic/angular';
// import { Filter } from 'src/app/models/filter';
import { Establishment } from './../../models/establishment';
import { EstablishmentService } from './../../services/establishment.service';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.scss'],
})
export class EstablishmentsComponent implements OnInit {

  establishments: Establishment[] = [];
  // filters: Filter[] = [];
  deliveryFee = false;
  ordenation = 'Ordenar';
  readonly NOW = new Date();
  readonly DAY = this.NOW.toLocaleString('en-US', { weekday: 'long' });
  without = false;

  @Input() specialty: string;
  @Input() content: IonContent;

  @ViewChild('filter', { static: true }) btnFilter: IonButton;
  @ViewChild('deliveryFee', { static: true }) btnDeliveryFee: IonButton;
  @ViewChild('ordenate', { static: true }) btnOrdenation: IonButton;

  constructor(
    public establishmentService: EstablishmentService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    // this.resetComponent();
    // this.resetFilter();
    this.getEstablishments(null);
    if (this.content) {
      this.content.scrollToTop();
    }
  }

  // addFilter(param: string, value: string) {
  //   if (this.filters.some(f => f.param === param)) {
  //     this.filters.find(f => f.param === param).value = value;
  //   }
  //   else {
  //     this.filters.push({ param, value });
  //   }
  // }

  // removeFilter(param: string) {
  //   if (this.filters.some(f => f.param === param)) {
  //     this.filters = this.filters.filter(f => f.param !== param);
  //   }
  // }

  // resetFilter() {
  //   this.filters = [];
  //   this.deliveryFee = false;
  //   this.ordenation = 'Ordenar';
  //   this.btnFilter.color = 'light';
  //   this.btnDeliveryFee.color = 'light';
  // }

  // resetComponent() {
  //   this.establishments = [];
  //   if (this.specialty !== 'all') {
  //     this.addFilter('specialty', this.specialty);
  //     // this.establishmentService.setListParameters(this.filters);
  //     this.removeFilter('specialty');
  //   } else {
  //     // this.establishmentService.setListParameters(this.filters);
  //   }
  //   // this.specialty !== 'all' ? this.filters.addFilter('specialty', this.specialty) : this.filters.removeFilter('specialty');
  // }

  // updatefilters() {
  //   this.resetComponent();
  //   if (this.filters.length > 0) {
  //     this.btnFilter.color = 'danger';
  //   }
  //   else {
  //     this.btnFilter.color = 'light';
  //   }
  //   this.getEstablishments(null);
  // }

  getEstablishments(event: any) {
    this.establishmentService.listWithPagination()
      .subscribe(
        async response => {
          this.establishments = this.establishments.concat(response);
          if (event) {
            event.target.complete();
          }
          // this.establishments.forEach(e => {
          //   if (e.opening.some(o => o.weekday === this.DAY &&
          //     o.end >= this.NOW.toTimeString() &&
          //     o.start <= this.NOW.toTimeString())
          //   ) {
          //     e.open = false;
          //   } else {
          //     e.open = true;
          //   }
          // });
          if (response.length === 0 && this.establishments.length === 0) {
            const alert = await this.alertController.create({
              header: 'Locais não encontrados',
              message: 'Não possivel encontrar locais que vendem ' + this.specialty,
              buttons: [
                {
                  text: 'Ok',
                  cssClass: 'secondary',
                  handler: _ => {
                    this.without = true;
                  }
                }
              ]
            });
            await alert.present();
          }
        }
      );
  }

  goToEstablishmentById(id: number) {
    console.log(id);
  }

  openFilter() {
  }

  async presentActionSheet() {
    // TODO Fazer a rota de ordenação.
    // const actionSheet = await this.actionSheetController.create({
    //   header: 'Ordenar por:',
    //   cssClass: 'ordenation',
    //   backdropDismiss: true,
    //   buttons: [{
    //     text: 'Ordenação padrão',
    //     icon: 'swap-vertical-outline',
    //     cssClass: this.ordenation === 'Ordenar' ? 'active-button-ordenation' : '',
    //     handler: () => {
    //       this.removeFilter('ordenation');
    //       this.updatefilters();
    //       this.ordenation = 'Ordenar';
    //       this.btnOrdenation.color = 'light';
    //     }
    //   }, {
    //     text: 'Preço',
    //     icon: 'cash-outline',
    //     cssClass: this.ordenation === 'Preço' ? 'active-button-ordenation' : '',
    //     handler: () => {
    //       this.addFilter('ordenation', 'delivery_fee');
    //       this.updatefilters();
    //       this.ordenation = 'Preço';
    //       this.btnOrdenation.color = 'danger';
    //     }
    //   }, {
    //     text: 'Tempo de entrega',
    //     icon: 'stopwatch-outline',
    //     cssClass: this.ordenation === 'Tempo' ? 'active-button-ordenation' : '',
    //     handler: () => {
    //       this.addFilter('ordenation', 'delivery_time_min');
    //       this.updatefilters();
    //       this.ordenation = 'Tempo';
    //       this.btnOrdenation.color = 'danger';
    //     }
    //   }]
    // });
    // await actionSheet.present();
  }

  deliveryFree() {
    // this.establishments = [];
    // if (!this.deliveryFee) {
    //   this.btnDeliveryFee.color = 'danger';
    //   this.deliveryFee = true;
    //   this.addFilter('fee', '0.00');
    // }
    // else {
    //   this.btnDeliveryFee.color = 'light';
    //   this.deliveryFee = false;
    //   this.removeFilter('fee');
    // }
    // this.updatefilters();
  }
}
