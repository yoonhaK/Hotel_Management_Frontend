import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NormalTableComponent} from '../normal-table/normal-table.component';

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.css']
})
export class StaffTableComponent implements OnInit {

  @ViewChild(NormalTableComponent)
  public sTable: NormalTableComponent;
  public form: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      inDate: new FormControl('', [Validators.required]),
      outDate: new FormControl('', [Validators.required]),
    });
  }



  submitToGetStaff(): void {
    let date = {date1: {}, date2: {}};
    date.date1 = this.formatDate(this.form.get('inDate').value);
    date.date2 = this.formatDate(this.form.get('outDate').value);
    this.http.post('https://obscure-spire-66915.herokuapp.com/hotel_staff/find_eligible_staff', date).toPromise().then(data => {
      this.sTable.setExist(true);
      this.sTable.setData(data);
    }).catch(err => {

    })
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
