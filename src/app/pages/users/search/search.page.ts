import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  queryText: string;

  categories: [string, string][] = [
    ['Mercado', 'Lanche'],
    ['Pizza', 'Vegetariana'],
    ['Japonesa', 'Brasileira'],
    ['Bebidas', 'Açai'],
    ['Doces', 'Arabe'],
    ['Italiana', 'Chinesa']
  ];

  constructor(public route: Router) { }

  ngOnInit() {
  }

  goToSpecialties(link: string) {
    this.route.navigateByUrl(`users/specialty/${link}`);
  }

}
