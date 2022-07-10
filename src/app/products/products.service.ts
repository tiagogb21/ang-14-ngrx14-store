import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './store/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  // GET
  get() {
    return this.http.get<Products[]>('https://api-labs.tindin.com.br/games');
  }
  // CREATE
  create(payload: Products) {
    return this.http.post<Products>(
      'https://api-labs.tindin.com.br/games',
      payload
    );
  }
  // UPDATE
  update(payload: Products) {
    return this.http.put<Products>(
      `https://api-labs.tindin.com.br/games`,
      payload
    );
  }
  // DELETE
  delete(id: string) {
    console.log(id);
    return this.http.delete(`https://api-labs.tindin.com.br/games/${id}`);
  }
}
