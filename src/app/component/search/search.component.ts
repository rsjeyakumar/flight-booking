import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Search, FlightListResponse } from '../../models/models';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DatePipe]
})
export class SearchComponent implements OnInit {
  depatureDate: Date;
  minimumDate = new Date();
  searchForm: FormGroup;
  loader = false;
  flightList: FlightListResponse;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public flightService: FlightBookingService,
    private datepipe: DatePipe
  ) { }

  /*
  * @param
  * Get Search form controll access
  */
  get search() { return this.searchForm.controls; }

  /*
   * @param create form
   * Create form group object for login form
   */
  createForm() {
    this.searchForm = this.fb.group({
      deaptureLocation: ['', Validators.required],
      arraivalLocation: ['', Validators.required],
      depatureDate: ['', Validators.required],
      travellers: ['', Validators.required],
      travelClass: ['', Validators.required],
    });
  }

  /*
   * @param Search Flight
   * Create Search Form group object for Search Flights
   */
  showFlights() {
    if (this.searchForm.valid) {
      this.loader = true;
      const postObj = {
        departureLocation: this.searchForm.value.deaptureLocation,
        arrivalLocation: this.searchForm.value.arraivalLocation,
        departureDate: this.datepipe.transform(this.searchForm.value.depatureDate, 'yyyy-MM-dd'),
        noOfTravellers: +this.searchForm.value.travellers,
        classType: this.searchForm.value.travelClass
      };
      this.flightService.searchFlights(postObj).subscribe(res => {
        this.flightList = res;
        this.loader = false;
      }, error => {
        this.loader = false;
      });
    }
  }

  /*
    * @param Book Flight
    * Book Flight from list
    */
  bookFlights(flightsDetails) {
    const travellers = this.searchForm.value.travellers;
    const postObj = flightsDetails;
    postObj.noOfPassenger = travellers;

    this.router.navigate(['/booking'], { queryParams: postObj });
  }

  ngOnInit() {
    this.createForm();
  }

}
