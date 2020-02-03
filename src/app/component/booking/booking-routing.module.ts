import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
