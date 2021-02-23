import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GuestComponent} from '../guest/guest.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TableComponent} from '../table/table.component';
import {DeleteTableComponent} from '../delete-table/delete-table.component';
import {RoomGridComponent} from '../room-grid/room-grid.component';

@Component({
  selector: 'app-reservation-guest',
  templateUrl: './reservation-guest.component.html',
  styleUrls: ['./reservation-guest.component.css']
})
export class ReservationGuestComponent implements OnInit {
  @ViewChildren(GuestComponent)
  private guests: QueryList<GuestComponent>;

  @ViewChild(TableComponent)
  public roomTable: TableComponent;

  @ViewChild(DeleteTableComponent)
  public reservationRecordTable: DeleteTableComponent;

  @ViewChild(RoomGridComponent, {static: false})
  public roomGrid: RoomGridComponent;

  public form: FormGroup;
  public record: any;
  public minDate: Date = new Date();
  public listAdd = [];
  public reqBody: any;
  public displayReserveButton = false;
  public getMin = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      $key: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      creditCard: new FormControl('', [Validators.required]),
      photoID: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      inDate: new FormControl('', [Validators.required]),
      outDate: new FormControl('', [Validators.required]),
    });
    this.record = {};
    this.reqBody = {};
  }

  submitRecord(): any {
    if (this.form.valid) {
      this.roomTable.chosen = -1;
      this.record.name = this.form.get('name').value;
      this.record.phone = this.form.get('phone').value;
      this.record.credit_card = this.form.get('creditCard').value;
      this.record.photo_identity = this.form.get('photoID').value;
      this.record.email = this.form.get('email').value;
      this.record.membership = null;
      let date = {inDate: {}, outDate: {}};
      date.inDate = this.formatDate(this.form.get('inDate').value);
      date.outDate = this.formatDate(this.form.get('outDate').value);
      let recordData = [];
      this.guests.forEach(ele => {
        // console.log(ele.exist);
        if(ele.exist) {
          const singleData = ele.submitRecord();
          if (singleData) {
            recordData.push(singleData);
          }
        }
      });
      let ret = {reservationGuest: {}, inHouseGuests: [], date: {}};
      ret.reservationGuest = this.record;
      ret.inHouseGuests = recordData;
      ret.date = date;
      this.reqBody = ret;
      // console.log(ret);
      if (this.getMin) {
        this.http.post('https://obscure-spire-66915.herokuapp.com/guest/query_cheap_rooms', ret).toPromise().then((data: any) => {
          // this.service.tData = data;
          // console.log(data);
          this.roomTable.setData(data);
          this.displayRooms(true);
        }).catch(err => {

        })
      } else {
        this.http.post('https://obscure-spire-66915.herokuapp.com/guest/query_rooms', ret).toPromise().then((data: any) => {
          // this.service.tData = data;
          // console.log(data);
          this.roomTable.setData(data);
          this.displayRooms(true);

        }).catch((err) => {

        });
      }
    }
  }

  addGuest(): any {
      this.listAdd.push(1);
  }

  displayRooms(bool): void {
    this.reservationRecordTable.setExist(!bool);
    this.roomTable.setExist(bool);
    this.displayReserveButton = bool;
  }

  reserveRoom(): any {
    this.reqBody.rm_number = this.roomTable.data[this.roomTable.chosen].room_number;
    this.http.post('https://obscure-spire-66915.herokuapp.com/guest/reserve_room', this.reqBody).toPromise().then((data: any) => {
      // this.service.tData = data;
      this.displayRooms(false);
      this.reservationRecordTable.setData(data);
      this.roomGrid.update();
    }).catch((err) => {

    });
  }

  fromChild(event): void {
    this.roomGrid.update();
  }

  displayReserveRecords(): void {
    this.record.credit_card = this.form.get('creditCard').value;
    this.record.photo_identity = this.form.get('photoID').value;
    this.http.get(`https://obscure-spire-66915.herokuapp.com/guest/reservations/${this.record.photo_identity}/${this.record.credit_card}`, this.record).toPromise().then((data: any) => {
      // this.service.tData = data;
      this.displayRooms(false);
      this.reservationRecordTable.setData(data);
    }).catch((err) => {

    });

  }

  public formatDate(date: any):string {
      let d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      // console.log(d.getMonth());
      let day = '' + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) {
      month = '0' + month;
      }
      if (day.length < 2) {
      day = '0' + day;
      }
      return [year, month, day].join('-');
  }



}
