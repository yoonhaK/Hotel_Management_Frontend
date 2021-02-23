import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {NormalTableComponent} from '../normal-table/normal-table.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dialog-a',
  templateUrl: './dialog-a.component.html',
  styleUrls: ['./dialog-a.component.css']
})
export class DialogAComponent implements OnInit {
  @ViewChild(NormalTableComponent)
  public priceTable: NormalTableComponent;

  public sumExist = false;

  receptionistVal = new FormControl('', [
    Validators.required,
  ]);
  public checkOption;
  public options = [ 'check in', 'check out', 'delete check-out record', 'clear all check in/out records'];
  public enabled = [];
  public billEnabled = false;
  public totalPrice;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DialogAComponent>, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.data);
    this.enabled.push(!(this.data.item.checkIn));
    this.enabled.push(this.data.item.checkIn && !this.data.item.checkIn.out_index &&
      (this.data.item.index + this.data.innerIndex >= this.data.item.checkIn.in_index));
    this.enabled.push(this.data.item.checkIn && this.data.item.checkIn.out_index);
    this.enabled.push(this.data.item.checkIn);
    this.billEnabled = this.data.item.checkIn && Object.keys(this.data.item.checkIn).includes('in_index')
      && Object.keys(this.data.item.checkIn).includes('out_index');
    // console.log(this.enabled);
  }

  submit(): void {
    if (this.data.month.length < 2) {
      this.data.month = '0' + this.data.month;
    }
    let day = this.data.item.index + this.data.innerIndex + 1;
    if (day.length < 2) {
      day = '0' + day;
    }
    let date = [this.data.year, this.data.month, day].join('-');
    this.dialogRef.close({purpose: this.options[this.checkOption],
    data:{
      guest_id: this.data.item.reservation_guest.guest_id,
      rm_number: this.data.rm_number,
      ck_id: this.data.item.checkIn ? this.data.item.checkIn.ck_id : null,
      date,
      receptionist: this.data.receptionists[this.receptionistVal.value].sid,
    }});
  }

  getBill(): void {
      this.http.get(` https://obscure-spire-66915.herokuapp.com/rooms/room-records-in-checkout/${this.data.item.checkIn.ck_id}`).toPromise().then(data => {
        this.priceTable.setData(data);
        this.totalPrice = this.getTotalPrice(data);
        this.sumExist = true;
        this.priceTable.setExist(true);
      }).catch(err => {

      });
  }

  getTotalPrice(data): number {
    let sum = 0;
    for (let item of data) {
      sum += item.price;
    }
    return sum;
  }

}
