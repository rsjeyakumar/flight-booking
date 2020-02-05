import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelComponent } from './cancel.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('CancelComponent', () => {
  let component: CancelComponent;
  let fixture: ComponentFixture<CancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedModule, PrimengModule, BrowserAnimationsModule ],
      providers: [FlightBookingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
