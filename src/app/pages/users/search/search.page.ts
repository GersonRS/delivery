import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  queryText;
  showSearchbar;

  constructor() { }

  ngOnInit() {
  }

  updateSchedule() { }

  presentFilter() { }

}
