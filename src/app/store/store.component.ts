import { Component, Signal, computed, signal } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';
import { PlatformService } from '../platform.service';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  products: Signal<Product[]>;
  categories: Signal<string[]>;
  selectedCategory = signal<string | undefined>(undefined);
  productsPerPage = signal(4);
  selectedPage = signal(1);
  pagedProducts: Signal<Product[]>;
  //pageNumbers: Signal<number[]>;
  pageCount: Signal<number>;

  constructor(
    private repository: ProductRepository, 
    private cart: Cart,
    private router: Router,
    private ps: PlatformService
  ) {
    this.products = computed(() => {
      if (this.selectedCategory() == undefined) {
        return this.repository.products();
      } else {
        return this.repository.products()
          .filter(p => p.category == this.selectedCategory());
      }
    });

    this.categories = repository.categories;

    let pageIndex = computed(() => {
      return (this.selectedPage() - 1) * this.productsPerPage();
    });

    this.pagedProducts = computed(() => {
      return this.products().slice(pageIndex(), pageIndex() + this.productsPerPage());
    });

    /* this.pageNumbers = computed(() => {
      return Array(Math.ceil(this.products().length / this.productsPerPage()))
        .fill(0).map((x, i) => i + 1);
    }); */


    this.pageCount = computed(() => {
      return Math.ceil(this.products().length / this.productsPerPage());
    });
  }
    
  changeCategory(newCategory?: string) {
    this.selectedCategory.set(newCategory);
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectedPage.set(newPage);
  }

  changePageSize(newSize: number) {
    this.productsPerPage.set(Number(newSize));
    this.changePage(1);
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }

  get isServer() { return this.ps.isServer }
}
