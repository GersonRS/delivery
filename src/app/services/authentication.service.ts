import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Authentication } from '../models/authentication';
import { User } from '../models/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private authenticationStateSubject = new BehaviorSubject<User>(null);

  private body = {
    grant_type: environment.GRANT_TYPE,
    client_id: environment.CLIENT_ID,
    client_secret: environment.CLIENT_SECRET,
    username: '',
    password: '',
    scope: ''
  };

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.loadStoredToken();
  }

  async loadStoredToken() {
    const storageObs = from(this.storage.ready());
    this.currentUser = storageObs
      .pipe(
        switchMap(_ => from(this.storage.get(environment.USER_KEY))),
        map(user => {
          if (user) {
            this.authenticationStateSubject.next(user);
            return user;
          } else {
            return null;
          }
        })
      );
  }

  login(login: { username: string, password: string }) {
    this.body.username = login.username;
    this.body.password = login.password;
    return this.http.post<Authentication>(environment.URL_AUTENTICATION, this.body)
      .pipe(
        take(1),
        first(),
        map(authentication => {
          return authentication.access_token;
        }),
        switchMap(token => from(this.storage.set(environment.TOKEN_KEY, token))),
        switchMap(_ => this.userService.setParameters('roles-address').get()),
        map((response: any) => response.data),
        switchMap(user => from(this.storage.set(environment.USER_KEY, user))),
        tap(user => this.authenticationStateSubject.next(user))
      );
  }

  register(login: { name: string, email: string, password: string }) {
    return this.http.post<User>(environment.URL_REGISTER, login)
      .pipe(
        take(1),
        first(),
        map((response: any) => response.data)
      );
  }

  public get authenticationStateSubjectValue(): User {
    return this.authenticationStateSubject.value;
  }

  getUser() {
    return this.authenticationStateSubject.asObservable();
  }

  logout() {
    const storageObs = from(this.storage.ready());
    return storageObs
      .pipe(
        switchMap(_ => from(this.storage.remove(environment.TOKEN_KEY))),
        switchMap(_ => from(this.storage.remove(environment.USER_KEY))),
        tap(_ => {
          this.router.navigateByUrl('/auth');
          this.authenticationStateSubject.next(null);
        }),
        take(1)
      );
  }
}
