// Reducer is a pure function, that gets invoked by the actions and then generates a new state in the store based on the action.

import { createReducer } from '@ngrx/store';
import { Products } from '../store/products';

export const initialState: ReadonlyArray<Products> = [];

export const productReducer = createReducer(initialState);
