import { AlertController } from '@ionic/angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private alertCtrl: AlertController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.authenticationService.logout()
          .subscribe(_ => this.alertCtrl.create({
            header: 'Não autorizado',
            message: 'Sua sessão expirou ou você não tem autorização de acessar essa pagina.',
            buttons: ['OK']
          }).then(alert => alert.present()));
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
