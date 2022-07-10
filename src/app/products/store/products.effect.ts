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
  invokeUpdateProductAPI,
  updateProductAPISucess,
  invokeDeleteProductAPI,
  deleteProductAPISuccess,
} from './products.action';
import { selectProducts } from './products.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Products } from './products';

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
            const targetItem: string = '';
            return productsFetchAPISuccess({
              allProducts: data.games
                .slice(0, 10)
                .filter((item: Products) =>
                  item.title.toLowerCase().includes(targetItem.toLowerCase())
                )
                .map((i: any) => {
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
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: '',
            },
          })
        );
        return this.productsService.create(action.newProduct).pipe(
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

  // UPDATE - PUT
  updateProductAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateProductAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: '',
            },
          })
        );
        return this.productsService.update(action.updateProduct).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: {
                  apiResponseMessage: '',
                  apiStatus: 'success',
                },
              })
            );
            return updateProductAPISucess({ updateProduct: data });
          })
        );
      })
    );
  });

  // DELETE - DELETE:
  deleteBooksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteProductAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: '',
            },
          })
        );
        return this.productsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: {
                  apiResponseMessage: '',
                  apiStatus: 'success',
                },
              })
            );
            return deleteProductAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
