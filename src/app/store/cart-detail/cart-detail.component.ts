import { Component } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { ConnectionService } from 'src/app/model/connection.service';

@Component({
  selector: 'cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent {
  constructor(public cart: Cart, private connection: ConnectionService) { }

  get connected() {
    return this.connection.connected;
  }
}
