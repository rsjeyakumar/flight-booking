import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedModule, PrimengModule, BrowserAnimationsModule ],
      providers: [FlightBookingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
