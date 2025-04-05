import { Component, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  imports: [ProductDetailsComponent, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {

  products: Product[] = [
    { id: 1, name: 'Laptop', description: 'High performance laptop', price: 1200, available: true },
    { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 800, available: false },
    { id: 3, name: 'Headphones', description: 'Noise-canceling headphones', price: 150, available: true }
  ];

  selectedProduct?: Product;
  
  @ViewChild(ProductDetailsComponent) productDetailsComponent?: ProductDetailsComponent;

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }
}
