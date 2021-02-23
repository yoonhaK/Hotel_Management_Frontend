import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Window2Component } from './window2.component';

describe('Window2Component', () => {
  let component: Window2Component;
  let fixture: ComponentFixture<Window2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Window2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Window2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
