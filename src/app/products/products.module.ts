import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';

import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('myproducts', productReducer),
  ],
})
export class ProductsModule {}
