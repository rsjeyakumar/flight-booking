import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightBookingService } from '../services/flight-booking.service';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [AlertComponent, LoaderComponent],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [FlightBookingService, AuthGuardService],
  exports: [
    FormsModule, ReactiveFormsModule,
    HttpClientModule, AlertComponent, LoaderComponent]
})
export class SharedModule { }
