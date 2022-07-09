// 'Selector': is used to fetch any number of slices of data from the store into the components.

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Products } from './products';

// 'createFeatureSelector': is used to fetch all the data from our feature module.

// 'myproducts': is used to register the 'productReducer' into the 'products.modulet.ts'.

export const selectProducts = createFeatureSelector<Products[]>('myproducts');

export const selectProductById = (productId: number) =>
  createSelector(selectProducts, (products: Products[]) => {
    const productbyId = products.filter(
      (product) => `${product._id}` === `${productId}`
    );
    if (productbyId.length === 0) {
      return null;
    }
    return productbyId[0];
  });
