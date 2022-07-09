import { createAction, props } from '@ngrx/store';
import { Products } from './products';

export const invokeProductsAPI = createAction(
  '[Products API] Invoke Products Fetch API'
);

export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch API Success',
  props<{ allProducts: Products[] }>()
);

export const updateProductAPISucess = createAction(
  '[Products API] update product api success',
  props<{ updateProduct: Products }>()
);
