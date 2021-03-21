import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate{

constructor(private router: Router,
  private authService: AuthService) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  if(!this.authService.loggedin()){
  this.router.navigate(['/login']);
            return false;
        }
        else{
          return true
        }


  }
}
