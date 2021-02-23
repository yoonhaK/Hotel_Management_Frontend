import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationGuestComponent } from './reservation-guest.component';

describe('ReservationGuestComponent', () => {
  let component: ReservationGuestComponent;
  let fixture: ComponentFixture<ReservationGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
