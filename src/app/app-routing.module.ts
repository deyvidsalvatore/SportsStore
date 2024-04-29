import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/cart-detail/cart-detail.component';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { StoreFirstGuard } from './store/store-first.guard';

const routes: Routes = [
  { path: "store", component: StoreComponent,
    canActivate: [StoreFirstGuard]
  },
  { path: "cart", component: CartDetailComponent,
    canActivate: [StoreFirstGuard]
  },
  { path: "checkout", component: CheckoutComponent,
    canActivate: [StoreFirstGuard]
  },
  { 
    path: "admin",
    loadChildren: () => import("./admin/admin.module")
      .then(m => m.AdminModule),
    canActivate: [StoreFirstGuard]
  },
  { path: "**", redirectTo: "/store"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }