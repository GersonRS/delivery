import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { NgForm, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    
  }

  login(form: NgForm){
    this.authService.login(form.value.email,form.value.password)
      .subscribe(_=>this.router.navigate(['/tabs']));
    this.authService.test()
      .then( token => console.log(token));
  }

  async presentAlert(event) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
