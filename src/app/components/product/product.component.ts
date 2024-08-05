import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../../types";
import { RatingModule } from 'primeng/rating';
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import { ButtonModule } from 'primeng/button';
import {ConfirmationService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {PricePipe} from "../../pipes/price.pipe";
import {TruncateNamePipe} from "../../pipes/truncate-name.pipe";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonDirective, ButtonModule, ConfirmPopupModule, PricePipe, TruncateNamePipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) {
  }

  @ViewChild('deleteButton') deleteButton: any; // ViewChild automatically locate and get our button based on #deleteButton property that is set in .ts

  @Input() product!: Product
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  truncateName(name: string) {
    // not to show full name if the number of characters exides 16, otherwise show 16 characters of the name and add ...(three dots) in the end
    if (name.length > 16) {
      return name.slice(0, 16) + '...';
    }

    return name;
  }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElemet, // corresponding popup for each Product
      message: 'Are you sure you want to delete this product?',
      // on accept of this question this method will be called
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {
  }
}
