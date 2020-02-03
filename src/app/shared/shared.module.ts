import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightBookingService } from '../services/flight-booking.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [FlightBookingService],
  exports: [
    FormsModule, ReactiveFormsModule,
    HttpClientModule]
})
export class SharedModule { }
