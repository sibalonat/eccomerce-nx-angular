import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private lclStg: LocalstorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.lclStg.getToken()

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true;
      }
    }

    this.router.navigate(['/login'])
    return false;
  }

  private _tokenExpired(expiration: any) : boolean
  {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
