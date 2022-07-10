// Reducer is a pure function, that gets invoked by the actions and then generates a new state in the store based on the action.

import { createReducer, on } from '@ngrx/store';
import { Products } from '../store/products';
import {
  deleteProductAPISuccess,
  productsFetchAPISuccess,
  saveNewProductAPISucess,
  updateProductAPISucess,
} from './products.action';

export const initialState: ReadonlyArray<Products> = [];

export const productReducer = createReducer(
  // READ:
  initialState,
  on(productsFetchAPISuccess, (_state, { allProducts }) => {
    return allProducts;
  }),
  // Here we generate the new state along with by adding the newly created record.
  // CREATE:
  on(saveNewProductAPISucess, (state, { newProduct }) => {
    let newState = [...state];
    newState.unshift(newProduct);
    return newState;
  }),
  // UPDATE:
  on(updateProductAPISucess, (state, { updateProduct }) => {
    let newState = state.filter((product) => product._id !== updateProduct._id);
    newState.unshift(updateProduct);
    return newState;
  }),
  // DELETE:
  on(deleteProductAPISuccess, (state, { id }) => {
    let newState = state.filter((product) => `${product._id}` !== `${id}`);
    return newState;
  })
);
