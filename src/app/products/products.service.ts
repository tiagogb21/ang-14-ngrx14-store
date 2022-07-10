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
  update(payload: Products) {
    return this.http.put<Products>(
      `https://api-labs.tindin.com.br/games`,
      payload
    );
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
