import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './store/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Products[]>('https://api-labs.tindin.com.br/games');
  }
  create(payload: Products) {
    return this.http.post<Products>(
      'https://api-labs.tindin.com.br/games',
      payload
    );
  }
}
