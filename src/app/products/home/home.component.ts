import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import {
  invokeDeleteProductAPI,
  invokeProductsAPI,
} from '../store/products.action';
import { selectProducts } from '../store/products.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  products$ = this.store.pipe(select(selectProducts));

  teste: boolean = true;
  deleteModal: any;
  idToDelete: string = '0';

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.products$.subscribe((value) => {
      this.teste = value.length === 0;
    });

    this.store.dispatch(invokeProductsAPI());
  }

  openDeleteModal(id: string) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.store.dispatch(
      invokeDeleteProductAPI({
        id: this.idToDelete,
      })
    );

    let apiStatus$ = this.appStore.pipe(select(selectAppState));

    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus === 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: {
              apiResponseMessage: '',
              apiStatus: '',
            },
          })
        );
      }
    });
  }
}
