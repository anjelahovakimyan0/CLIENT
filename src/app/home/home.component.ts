import {Component} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product, Products} from "../../types";
import {ProductComponent} from "../components/product/product.component";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private productsService: ProductsService,
  ) {
  }

  products: Product[] = [];

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {page, perPage})
      .subscribe((products: Products) => {
        this.products = products.items;
      })
  }

  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {page: 0, perPage: 5})
      .subscribe((products: Products) => {
        this.products = products.items;
      })
  }
}
