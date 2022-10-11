import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import { AppRoutes } from "../app-routes";


/**
 * Ensures before user is able to visit a view, at minimum a auth token needs to be present
 * or the user will auto get routed back to the login view.
 */
@Injectable()
export class GuardLogin implements CanActivate {

  constructor(private router: Router){

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('userDetails')) {
      console.warn('<< GuardLogin >> success');
      return true;
    } else {
      console.warn('<< GuardLogin >> View is prevented, http or token is null, routing to login');
    }

    this.router.navigate([AppRoutes.LOGIN]);
    return false;
  }

}