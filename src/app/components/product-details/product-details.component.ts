import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { invokeProductsAPI } from 'src/app/products/store/products.action';
import { selectProducts } from 'src/app/products/store/products.selector';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  gameInfo: any;
  constructor(
    private store: Store,
    private route: ActivatedRoute // public gameInfo: Products
  ) {
    this.productId = '';
    this.route.params.subscribe(
      (params: any) => (this.productId = params['id'])
    );
  }

  products$ = this.store.pipe(select(selectProducts));
  grade: any;
  note: number = 0;
  totalVotes: any;

  ngOnInit(): void {
    this.store.dispatch(invokeProductsAPI());

    this.products$.subscribe((value) => {
      const getGameInfo = value.filter((item) => {
        return item._id === this.productId;
      });
      this.gameInfo = getGameInfo[0];
      this.grade = getGameInfo[0].rating;
      this.totalVotes = getGameInfo[0].totalVotes;
    });
  }

  changeGrade() {
    this.grade = this.note;
    this.totalVotes += 1;
  }
}
