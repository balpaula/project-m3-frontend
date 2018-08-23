import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class InitAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Promise<any> {
    return this.authService.me()
      .then((user) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}
