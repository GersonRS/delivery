import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  template: `
            <input type="text"[(ngModel)]="name" />
            <br>
            <p>{{ name }}</p>
            `,
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  public name: string;

  constructor() { }

  ngOnInit() { }

}
