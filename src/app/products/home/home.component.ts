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
import carrousselImages, { Carroussel } from '../../../data/data';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  products$ = this.store.pipe(select(selectProducts));
  games: any[] = [];
  gamesClone: any[] = [];
  verify: boolean = true;
  deleteModal: any;
  idToDelete: string = '0';
  inputSearch: string = '';
  token: boolean = true;
  carroussel: Carroussel[] = carrousselImages;
  chooseImage: number = 2;
  targetImage: Carroussel = this.carroussel[0];

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.products$.subscribe((value) => {
      this.verify = value.length === 0;
      this.games = [...value];
      this.gamesClone = [...value];
    });

    this.store.dispatch(invokeProductsAPI());

    this.token = !localStorage.getItem('token');
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

  gameSearch() {
    this.games = this.gamesClone.filter((game) =>
      game.title.toLowerCase().includes(this.inputSearch.toLowerCase())
    );
  }

  increase() {
    this.chooseImage += 1;
    this.targetImage = this.carroussel[this.chooseImage % 3];
  }

  decrease() {
    if (this.chooseImage === 0) {
      this.chooseImage += 2;
    } else {
      this.chooseImage -= 1;
    }
    this.targetImage = this.carroussel[this.chooseImage % 3];
    console.log(this.chooseImage);
  }
}
