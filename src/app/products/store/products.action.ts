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

// UPDATE

export const invokeUpdateProductAPI = createAction(
  '[Products API] Invoke update product api',
  props<{ updateProduct: Products }>()
);

// DELETE

export const invokeDeleteProductAPI = createAction(
  // triggers ngrx effect that executes delete API.
  '[Products API] Invoke delete product api',
  props<{ id: string }>()
);

export const deleteProductAPISuccess = createAction(
  // Used by the reducer to remove the item from the store state.
  '[Products API] Deleted product api success',
  props<{ id: string }>()
);
