import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  cnames = [];
  data = [];
  exist = false;
  chosen = -1;

  constructor() { }

  ngOnInit(): void {
  }

  setData(data): void {
    this.exist = true;
    this.data = data;
    this.cnames = Object.keys(data[0]);
  }

  setExist(bool): void {
    this.exist = bool;
  }

  setAll(bool, i) {
    if (bool) {
      this.chosen = i;
    }
  }

}
