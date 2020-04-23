import { AuthService } from './../_services/auth.service';
import { EstablishmentService } from '../_services/establishment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  slideOpts = {
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom'
    },
  };

  slideOpts2 = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
    },
  };

  slideOpts3 = {
    slidesPerView: 3,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
    },
  };
  
  private establishments = [];

  constructor(
    public loadingController: LoadingController,
    public establishmentService: EstablishmentService,
    public authService: AuthService

  ) { }


  ngOnInit() {
    this.getEstablishments();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async getEstablishments() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.establishmentService.listWithPagination()
      .subscribe(response => {
        this.establishments = response;
        console.log(this.establishments);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      
      // event.target.disabled = true;
      
    }, 2000);
  }

  logout(){
    this.authService.logout();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
