import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let api: FlightBookingService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    searchFlights() {
      return of({
        flightList : [
          {
            flightName: 'Indigo',
            departureLocation: 'Chennai',
            arrivalLocation: 'Madurai',
            departureDate: '20-01-2020',
            duration: '02:30',
            departureTime: '09:20',
            arrivalTime: '08:50',
            price: 5000,
            travelId: 12345,
            flightId: 54321
          }
        ]
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedModule, PrimengModule, BrowserAnimationsModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FlightBookingService, useValue: mockUserService}
      ]
    })
    .compileComponents();
    api = TestBed.get(FlightBookingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to booking page', () => {
    const postObj = {
      departureLocation: 'Chennai',
      arrivalLocation: 'Madurai',
      departureDate: '2020-02-02',
      noOfTravellers: 2,
      classType: 'Business'
    };
    component.bookFlights(postObj);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['booking', postObj]);
  });

  it('should return All Flights', () => {
    component.showFlights();
    component.loader = false;
    const postObj = {
      departureLocation: 'Chennai',
      arrivalLocation: 'Madurai',
      departureDate: '2020-02-02',
      noOfTravellers: 2,
      classType: 'Business'
    };
    expect(api.searchFlights(postObj)).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
