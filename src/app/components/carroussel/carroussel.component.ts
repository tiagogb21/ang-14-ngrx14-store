import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-carroussel',
  templateUrl: './carroussel.component.html',
  styleUrls: ['./carroussel.component.css'],
})
export class CarrousselComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
