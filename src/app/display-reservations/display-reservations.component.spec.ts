import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReservationsComponent } from './display-reservations.component';

describe('DisplayReservationsComponent', () => {
  let component: DisplayReservationsComponent;
  let fixture: ComponentFixture<DisplayReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
