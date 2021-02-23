import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationGuestComponent} from './reservation-guest/reservation-guest.component';
import {WindowComponent} from './window/window.component';
import {DisplayReservationsComponent} from './display-reservations/display-reservations.component';
import {Window2Component} from './window2/window2.component';
import {RoomGridComponent} from './room-grid/room-grid.component';
import {StaffTableComponent} from './staff-table/staff-table.component';

const  routes: Routes = [
  {path: 'guests-reserve',
    component: WindowComponent
  },
  {path: 'management',
    component: Window2Component,
    children: [
      {path: 'room',
      component: RoomGridComponent},
      {
        path: 'staff',
        component: StaffTableComponent
      },
      {
        path: '',
        redirectTo: 'room',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'guests-reserve',
    pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
