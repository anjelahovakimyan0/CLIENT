import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {CommonModule} from "@angular/common";
import {Product} from "../../../types";
import {ButtonDirective} from "primeng/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonDirective, FormsModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  @Input() display: boolean = false;
  @Output() displayChange= new EventEmitter<boolean>();
  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<Product>(); // if we want to update or add a new product this output will emit the values outside

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? {
        hasSpecialCharacter: true
      } : null; // if return null - that means there isn't found any issues
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]], // [] - array of validators
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
