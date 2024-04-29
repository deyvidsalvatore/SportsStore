import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { StoreComponent } from "./store.component";

@Injectable()
export class StoreFirstGuard {
    private firstNavigation = true;

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
        if (this.firstNavigation && route.component !== StoreComponent) {
          this.router.navigateByUrl("/");
          return false;
        }
        this.firstNavigation = false;
        return true;
      }
}