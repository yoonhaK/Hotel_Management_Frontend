import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NormalTableComponent} from '../normal-table/normal-table.component';

@Component({
  selector: 'app-projection-table',
  templateUrl: './projection-table.component.html',
  styleUrls: ['./projection-table.component.css']
})
export class ProjectionTableComponent implements OnInit {
  @ViewChild(NormalTableComponent)
  public sTable: NormalTableComponent;
  options = ['name', 'm_date', 'rm_number', 'date', 'phone'];
  public checkOptions = [false, false, false, false, false];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitToGetReservations(): void {
    let arr = [];
    for (let i = 0; i < this.checkOptions.length; i++) {
      if (this.checkOptions[i]) {
        arr.push(this.options[i]);
      }
    }
    this.http.post(' https://obscure-spire-66915.herokuapp.com/reservations/projection', arr).toPromise().then(data => {
      this.sTable.setData(data);
      this.sTable.setExist(true);
    }).catch(err => {

    });
  }

}
