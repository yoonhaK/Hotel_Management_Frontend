import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.css']
})
export class DeleteTableComponent implements OnInit {
  @Output() fromChild = new EventEmitter<any>();

  cnames = [];
  data = [];
  exist = false;


  constructor(private http: HttpClient) { }

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

  cancelReservation(i, rid): void {
    this.data.splice(i, 1);
    this.http.delete(` https://obscure-spire-66915.herokuapp.com/guest/reservations/${rid}`).toPromise().then(() => {
      this.fromChild.emit('cancel');
    }).catch(err => {
    });
  }

}
