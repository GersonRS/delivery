import { Storage } from '@ionic/storage';
import { Authentication } from './../_models/authentication';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, Platform } from '@ionic/angular';

const TOKEN_KEY = environment.TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private authenticationStateSubject: BehaviorSubject<boolean>;
  public authenticationState: Observable<boolean>;

  private body = {
    grant_type: 'password',
    client_id: 2,
    client_secret: '27FUNHQuJokFOYSdPjHqc5zQ2GPKkHzLFwcmiMRK',
    username: '',
    password: '',
    scope: ''
  }
  

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
      this.authenticationStateSubject = new BehaviorSubject<boolean>(false);
      this.authenticationState = this.authenticationStateSubject.asObservable();
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.authenticationStateSubject.next(true);
        } else {
          this.logout();
        }
      }
    });
  }

  login(username: string, password: string): Observable<Authentication>{
    this.body.username = username;
    this.body.password = password;
    return this.http.post<Authentication>(environment.URL_AUTENTICATION, this.body)
      .pipe(
        tap(authentication => {
          this.storage.set(TOKEN_KEY, authentication.access_token);
          this.authenticationStateSubject.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationStateSubject.next(false);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationStateSubject.value;
  }

  test() {
    return this.storage.get(environment.TOKEN_KEY);
  }

  showAlert(msg: string) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

}
