import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { ProductsService } from '../products.service';
import { productsFetchAPISuccess, invokeProductsAPI } from './products.action';
import { selectProducts } from './products.selector';

@Injectable()
export class ProductsEffect {
  constructor(
    // Injected the 'Actions' service
    private actions$: Actions,
    private productsService: ProductsService,
    // Injected the 'Store'
    private store: Store
  ) {}

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
}
