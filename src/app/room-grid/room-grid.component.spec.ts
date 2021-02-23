import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomGridComponent } from './room-grid.component';

describe('RoomGridComponent', () => {
  let component: RoomGridComponent;
  let fixture: ComponentFixture<RoomGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
