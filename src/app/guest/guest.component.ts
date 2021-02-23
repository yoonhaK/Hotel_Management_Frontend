import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  public exist = true;
  public form: FormGroup;
  public record: any;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      $key: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('')
    });
    this.record = {};
  }

  deleteRecord(): void {
    this.exist = false;
  }

  submitRecord(): any {
    if (this.form.valid) {
      this.record.name = this.form.get('name').value;
      this.record.phone = this.form.get('phone').value;
      return this.record;
    }
  }

}
