import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { OrderRepository } from "./order.repository";
import { HttpClientModule } from "@angular/common/http";
import { RestDataSource } from "./rest.datasource";
import { AuthService } from "../admin/auth/auth.service";
import { ConnectionService } from "./connection.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, StaticDataSource, 
                Cart, Order, OrderRepository, 
                RestDataSource, AuthService, ConnectionService]
})
export class ModelModule { }