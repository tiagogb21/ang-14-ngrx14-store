import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeProductsAPI } from 'src/app/products/store/products.action';
import { selectProducts } from 'src/app/products/store/products.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  products$ = this.store.pipe(select(selectProducts));

  ngOnInit(): void {
    console.log(this.products$);
  }
}
