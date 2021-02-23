import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NormalTableComponent} from '../normal-table/normal-table.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent implements OnInit {

  @ViewChild(NormalTableComponent)
  public sTable: NormalTableComponent;
  public form: FormGroup;

  public options = ['min', 'max', 'avg'];
  priceVal = new FormControl('', [
    Validators.required,
  ]);
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public submitToGetRooms(): void {
    this.http.get(`https://obscure-spire-66915.herokuapp.com/rooms/room-records/price/${this.options[this.priceVal.value]}`).toPromise().then((data) => {
      this.sTable.setData(data);
      this.sTable.setExist(true);
    });
  }

}
