import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../types";
import { RatingModule } from 'primeng/rating';
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import { ButtonModule } from 'primeng/button';
import {ConfirmationService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonDirective, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) {
  }

  @Input() product!: Product
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);

  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      // on accept of this question this method will be called
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {

  }

  ngOnInit() {
  }
}
