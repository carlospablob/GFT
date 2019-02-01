import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private _router: Router
    ) { }

    canActivate(route, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}

