import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';

import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducer';

import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/products.effect';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('myproducts', productReducer),
    EffectsModule.forFeature([ProductsEffect]),
  ],
})
export class ProductsModule {}
