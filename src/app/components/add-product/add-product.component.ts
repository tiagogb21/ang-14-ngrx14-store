import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Products } from '../../products/store/products';
import { invokeSaveNewProductAPI } from '../../products/store/products.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  productForm: Products = {
    title: '',
    description: '',
    photos: {
      name: '',
      url: '',
    },
    genres: [],
    platforms: [],
    tags: [],
    rating: 0,
    totalVotes: 0,
    videos: [],
    createdAt: '',
    updatedAt: '',
    _v: 0,
    mediumPrice: 0,
    releaseYear: 0,
  };

  ngOnInit(): void {}

  cancel() {}

  save() {
    this.store.dispatch(
      invokeSaveNewProductAPI({ newProduct: this.productForm })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: '',
            },
          })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
