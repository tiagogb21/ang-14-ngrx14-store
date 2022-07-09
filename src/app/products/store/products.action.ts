import { createAction, props } from '@ngrx/store';
import { Products } from './products';

export const invokeProductsAPI = createAction(
  '[Products API] Invoke Products Fetch API'
);

export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch API Success',
  props<{ allProducts: Products[] }>()
);

// GET

export const updateProductAPISucess = createAction(
  '[Products API] update product api success',
  props<{ updateProduct: Products }>()
);

// POST

export const invokeSaveNewProductAPI = createAction(
  '[Products API] Invoke save new product api',
  props<{ newProduct: Products }>()
);

export const saveNewProductAPISucess = createAction(
  '[Products API] save new product api success',
  props<{ newProduct: Products }>()
);
