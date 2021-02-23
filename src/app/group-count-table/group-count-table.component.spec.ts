import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCountTableComponent } from './group-count-table.component';

describe('GroupCountTableComponent', () => {
  let component: GroupCountTableComponent;
  let fixture: ComponentFixture<GroupCountTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCountTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
