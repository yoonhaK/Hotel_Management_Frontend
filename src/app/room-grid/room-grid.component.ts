import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {DialogAComponent} from '../dialog-a/dialog-a.component';

@Component({
  selector: 'app-room-grid',
  templateUrl: './room-grid.component.html',
  styleUrls: ['./room-grid.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class RoomGridComponent implements OnInit {

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  public rooms = [];
  public receptionsts = [];
  public roomRecords = [];
  public keyNames = [];
  public year = new Date().getFullYear();
  public month = new Date().getMonth();
  public roomRecordsDisplay = [];
  public records_length = 0;
  public colors = ['#e03d38', '#4ed6d4', '#278bd7', '#26bb7b', '#f7b650'];
  public dates = [];
  public displayDetails = false;
  public checkInRecords = [];

  ngOnInit(): void {
    this.getRooms();
    this.getReservations();
    this.getReceptionists();
  }

  update(): void {
    this.getReservations();
  }

  openDialogA(item, i, roomIndex) {
    const dialogRef = this.dialog.open(DialogAComponent, {
       data: {item, innerIndex: i, year: this.year, month: this.month + 1, receptionists: this.receptionsts,
        rm_number: this.rooms[roomIndex - 1].rm_number}
    });
    dialogRef.afterClosed().toPromise().then((data)=> {
      // console.log(data);
      if (data.purpose === 'check in') {
        let trans = data.data;
        trans.in_date = trans.date;
        trans.ck_in = trans.receptionist;
        this.checkIn(trans);
      }
      if (data.purpose === 'check out') {
        this.checkOut(data.data);
      }
      if (data.purpose === 'delete check-out record') {
        this.deleteCheckOut(data.data);
      }
      if (data.purpose === 'clear all check in/out records') {
        this.clearCheckInOut(data.data.ck_id);
      }
    }).catch((err) => {

    })
  }

  clearCheckInOut(id) {
    this.http.delete(`https://obscure-spire-66915.herokuapp.com/checked-in-out-records/del-check-in-and-out/${id}`).toPromise().then( data => {
      this.getReservations();
    }).catch(err => {

    })
  }

  deleteCheckOut(obj): void {
    this.http.post('https://obscure-spire-66915.herokuapp.com/checked-in-out-records/del-check-out', obj).toPromise().then( data => {
      this.getReservations();
    }).catch(err => {

    })
  }

  checkIn(obj): void {
    console.log(obj);
    this.http.post('https://obscure-spire-66915.herokuapp.com/checked-in-out-records/check-in', obj).toPromise().then( data => {

      this.getReservations();
    }).catch(err => {

    })
  }

  checkOut(obj): void {
    this.http.post('https://obscure-spire-66915.herokuapp.com/checked-in-out-records/check-out', obj).toPromise().then( data => {
      this.getReservations();
    }).catch(err => {

    })
  }

  getReceptionists(): void {
    this.http.get('https://obscure-spire-66915.herokuapp.com/hotel_staff/receptionists/list').toPromise().then((data: any) => {
      this.receptionsts = data;
      // console.log(data);
    }).catch(err => {

    });
  }

  getRooms(): void {
    this.http.get('https://obscure-spire-66915.herokuapp.com/rooms/all').toPromise().then((data: any) => {
      this.rooms = data;
      this.keyNames = Object.keys(this.rooms[0]);
    }).catch(err => {

    });
  }

  getReservations(): void {
    this.http.get(`https://obscure-spire-66915.herokuapp.com/rooms/room-records/${this.year}/${this.month + 1}`).toPromise().then((data: any) => {
      // console.log(this.year);
      // console.log(this.month + 1);
      this.roomRecords = data;
      // console.log(data);
      return Promise.resolve('success');
    }).then((data) => {
      return this.getCheckIns();
    }).then((data) => {
      this.roomRecordsDisplay = this.processRoomRecords(this.roomRecords, this.checkInRecords);
      // console.log(this.roomRecordsDisplay);
    }).catch( err => {

    });
  }

  getCheckIns(): any {
    return this.http.get(`https://obscure-spire-66915.herokuapp.com/checked-in-out-records/${this.year}/${this.month + 1}`).toPromise().then((data: any) => {
      this.checkInRecords = data;
      //console.log(data);
      return Promise.resolve('success');
    });
  }

  processRoomRecords(data, checkIns): any {
    let ret = [];
    // console.log(data);
    const d = new Date(this.year, this.month + 1 , 0);
    const lenDays = d.getDate();
    this.dates = [];
    this.dates.push({color: 'lightblue', cols: 1});
    for (let i = 1; i <= lenDays; i++) {
      let item: any = {};
      item.color = 'lightblue';
      item.date = '' + this.year;
      item.cols = 1;
      let mon = this.month + 1;
      if (mon < 10) {
        item.date = item.date + '-'  + 0 + mon;
      } else {
        item.date = item.date + '-' + mon;
      }
      if (i < 10) {
        item.date = item.date + '-'  + 0 + i;
      } else {
        item.date = item.date + '-' + i;
      }
      let date = new Date(this.year, this.month, i);
      item.day = this.getStringDay(date);
      if (item.day === 'SUN' || item.day === 'SAT') {
        item.color = 'lightpink';
      }
      let today = new Date();
      if (i === today.getDate() && this.year === today.getFullYear() && this.month === today.getMonth()) {
        item.color = 'red';
      }
      this.dates.push(item);
    }
    ret.push(this.dates);
    // console.log(lenDays);
    this.records_length = lenDays + 1;
    let insert:any = {};
    insert.color = 'whitesmoke';
    insert.cols = 1;
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      const arr = [];
      const records = data[i];
      const checkRecords = checkIns[i];
      const cnt = data[i].length;
      const head: any = {};
      head.rm_number = data[i][0].rm_number;
      head.type = data[i][0].type;
      head.color = '#fff6df';
      head.cols = 1;
      arr.push(head);
      let start = 0;
      let temp: any = {};
      if (cnt === 1) {
        for (let k = 0; k < lenDays; k++) {
          let newInsert = Object.assign({}, insert);
          newInsert.index = k;
          arr.push(newInsert);
        }
      }
      let checkPtr = 0;
      for (let j = 1; j < cnt; j++) {
        let endPtr = records[j];
        if (checkRecords[checkPtr] && endPtr.index === checkRecords[checkPtr].index) {
          endPtr.checkIn = checkRecords[checkPtr];
          checkPtr++;
        }
        if (j === 1) {
          let segmentLen = endPtr.index - start;
          this.pushTrivialRoomRecord(segmentLen, insert, endPtr, arr);
          this.pushRoomRecord(endPtr, arr);
          temp = endPtr;
          start = endPtr.index + 1;
        } else {
          if (endPtr.index === start && endPtr.reservation_guest.guest_id === temp.reservation_guest.guest_id) {
            arr[arr.length - 1].in_house_guests.push(endPtr.in_house_guests);
            arr[arr.length - 1].cols = arr[arr.length - 1].cols + 1;
            if (endPtr.checkIn) {
              arr[arr.length - 1].checkIn = endPtr.checkIn;
            }
            temp = endPtr;
            start++;
          } else {
            let segmentLen = endPtr.index - start;
            this.pushTrivialRoomRecord(segmentLen, insert, endPtr, arr);
            this.pushRoomRecord(endPtr, arr);
            temp = endPtr;
            start = endPtr.index + 1;
          }
        }
        if (j === cnt - 1) {
          if (endPtr.index < lenDays - 1) {
            let segmentLen = lenDays - 1 - endPtr.index;
            this.pushTrivialRoomRecord(segmentLen, insert, endPtr, arr);
          }
        }
      }
      for (let i = 0; i < arr.length; i++) {
        let len = arr[i].cols;
        let placeHolder = [];
        for (let j = 0; j < len; j++) {
          placeHolder.push(1);
        }
        arr[i].innerArr = placeHolder;
      }
      ret.push(arr);
    }
    // console.log(ret);
    return ret;
  }

  private pushTrivialRoomRecord(segmentLen: number, insert: any, endPtr, arr: any[]) {
    for (let k = 0; k < segmentLen; k++) {
      let newInsert = Object.assign({}, insert);
      newInsert.index = endPtr.index + k;
      arr.push(newInsert);
    }
  }

  private pushRoomRecord(endPtr, arr: any[]) {
    let insert_reserve: any = {};
    insert_reserve.reservation_guest = endPtr.reservation_guest;
    insert_reserve.in_house_guests = [];
    insert_reserve.in_house_guests.push(endPtr.in_house_guests);
    insert_reserve.index = endPtr.index;
    insert_reserve.cols = 1;
    if (endPtr.checkIn) {
      insert_reserve.checkIn = endPtr.checkIn;
    }
    let id = endPtr.reservation_guest.guest_id;
    insert_reserve.color = this.colors[id % 5];
    arr.push(insert_reserve);
  }

  public getStringDay(date): String {
    let day = date.getDay();
    switch (day) {
      case (0):
        return 'SUN';
      case (1):
        return 'MON';
      case (2):
        return 'TUE';
      case (3):
        return 'WED';
      case (4):
        return 'THU';
      case (5):
        return 'FRI';
      case (6):
        return 'SAT';


    }
  }

  public goPrev(): void {
    this.month = this.month - 1;
    if (this.month === -1) {
      this.month = 11;
      this.year = this.year - 1;
    }
    this.getReservations();
  }

  public goNext():void {
    this.month = this.month + 1;
    if (this.month === 12) {
      this.month = 1;
      this.year = this.year + 1;
    }
    this.getReservations();
  }

  public setDisplayDetails(bool):void {
    this.displayDetails = bool;
  }

  public print(src) {
    console.log(src);
  }
}
