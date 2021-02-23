import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal-table',
  templateUrl: './normal-table.component.html',
  styleUrls: ['./normal-table.component.css']
})
export class NormalTableComponent implements OnInit {

  cnames = [];
  data = [];
  exist = false;

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
}
