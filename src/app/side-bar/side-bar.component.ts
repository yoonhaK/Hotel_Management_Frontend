import { Component, OnInit } from '@angular/core';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  path = '';
  constructor(private platform: PlatformLocation) { }

  ngOnInit(): void {
    this.path = this.platform.pathname.substr(2);
   //  console.log(this.path);
  }

}
