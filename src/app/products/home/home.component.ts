import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeProductsAPI } from '../store/products.action';
import { selectProducts } from '../store/products.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  products$ = this.store.pipe(select(selectProducts));

  ngOnInit(): void {
    this.products$.subscribe((value: any[]) => {
      console.log(value);
    });
    this.store.dispatch(invokeProductsAPI());
  }
}
