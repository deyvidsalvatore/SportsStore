import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
  colsAndRows: string[] = ['name', 'zip', 'cart_p', 'cart_q', 'buttons'];

  dataSource = new MatTableDataSource<Order>(this.repository.orders());
  differ: IterableDiffer<Order>;

  constructor(
    private repository: OrderRepository,
    private differs: IterableDiffers
  ) {
    this.differ = this.differs.find(this.repository.orders()).create();
    this.dataSource.filter = "true";
    this.dataSource.filterPredicate = (order, include) => {
      return !order.shipped || include.toString() == "true"
    };
  }

  get includedShipped(): boolean {
    return this.dataSource.filter == "true";
  }

  set includeShipped(include: boolean) {
    this.dataSource.filter = include.toString();
  }

  toggleShipped(order: Order) {
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  delete(id: number) { this.repository.deleteOrder(id); }
  
  ngDoCheck() {
    let changes = this.differ?.diff(this.repository.orders());
    if (changes != null) {
      this.dataSource.data = this.repository.orders();
    }
  }
}
