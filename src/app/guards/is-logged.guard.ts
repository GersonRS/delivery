import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (user == null) {
          return true;
        } else {
          const roles = (user.roles.filter(role => (role.name === 'Owner')));
          if (roles.length === 0 || roles === null) {
            this.router.navigateByUrl('users');
          } else {
            this.router.navigateByUrl('Owner');
          }
          return false;
        }
      })
    );
  }

}
