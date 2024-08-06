import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product, Products} from "../../types";
import {ProductComponent} from "../components/product/product.component";
import {CommonModule} from "@angular/common";
import {Paginator, PaginatorModule} from 'primeng/paginator';
import {EditPopupComponent} from "../components/edit-popup/edit-popup.component";
import {ButtonDirective} from "primeng/button";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonDirective, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
  ) { }

  @ViewChild('paginator') paginator: Paginator | undefined; // we can not to initialize this, it's optional, it can be also undefined as written

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProducts(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  // pre initialized state of the Product object
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayEditPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  deleteProducts(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data: Products) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  editProduct(product: Product, id: number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        }, // consider successful requests
        error: (error) => {
          console.log(error)
        }, // any response that is in range of 400s 500s is considered an error
      });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(`http://localhost:3000/clothes`, product)
      .subscribe(
        {
          next: (data) => {
            console.log(data)
            this.fetchProducts(0, this.rows);
            this.resetPaginator();
          }, // consider successful requests
          error: (error) => {
            console.log(error)
          }, // any response that is in range of 400s 500s is considered an error
        });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
