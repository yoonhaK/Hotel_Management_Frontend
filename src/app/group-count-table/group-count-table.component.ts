import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NormalTableComponent} from '../normal-table/normal-table.component';

@Component({
  selector: 'app-group-count-table',
  templateUrl: './group-count-table.component.html',
  styleUrls: ['./group-count-table.component.css']
})
export class GroupCountTableComponent implements OnInit {
  @ViewChild(NormalTableComponent)
  public sTable: NormalTableComponent;

  public form: FormGroup;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      count: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    });
  }

  submitToGetGuests(): void {
    this.http.get(`https://obscure-spire-66915.herokuapp.com/guest/reservations_greater_count/${this.form.get('count').value}`).toPromise().then( data => {
      this.sTable.setData(data);
      this.sTable.setExist(true);
    })
  }

}
