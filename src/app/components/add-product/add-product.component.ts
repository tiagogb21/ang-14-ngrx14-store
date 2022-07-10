import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { selectProductById } from 'src/app/products/store/products.selector';
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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
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

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectProductById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.productForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

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
