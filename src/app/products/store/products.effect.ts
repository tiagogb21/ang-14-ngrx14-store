import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { ProductsService } from '../products.service';
import { Appstate } from '../../shared/store/appstate';
import {
  productsFetchAPISuccess,
  invokeProductsAPI,
  invokeSaveNewProductAPI,
  saveNewProductAPISucess,
} from './products.action';
import { selectProducts } from './products.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class ProductsEffect {
  constructor(
    // Injected the 'Actions' service
    private actions$: Actions,
    private productsService: ProductsService,
    // Injected the 'Store'
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  // READ - GET
  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeProductsAPI),
      withLatestFrom(this.store.pipe(select(selectProducts))),
      mergeMap(([, productsfromStore]) => {
        if (productsfromStore.length > 0) {
          return EMPTY;
        }
        return this.productsService.get().pipe(
          map((data: any) => {
            return productsFetchAPISuccess({
              allProducts: data.games.slice(0, 10).map((i: any) => {
                return {
                  ...i,
                  photos: i.photos[0].url,
                };
              }),
            });
          })
        );
      })
    )
  );

  // CREATE - POST
  saveNewProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewProductAPI),
      switchMap((action: any) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.productsService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: {
                  apiResponseMessage: '',
                  apiStatus: 'success',
                },
              })
            );
            return saveNewProductAPISucess({ newProduct: data });
          })
        );
      })
    );
  });
}
