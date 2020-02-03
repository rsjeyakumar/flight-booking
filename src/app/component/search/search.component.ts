import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Search } from '../../models/models';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  depatureDate: Date;
  searchForm: FormGroup;
  loader = false;
  flightList: Search[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightService: FlightBookingService,
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
        depatureDate: this.searchForm.value.depatureDate,
        noOfTravellers: this.searchForm.value.travellers,
        class: this.searchForm.value.travelClass
      };
      this.flightService.searchFlights(postObj).subscribe(res => {
        console.log(res);
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
bookFlights(ticketId) {
  const travellers = this.searchForm.value.travellers;
  this.router.navigate(['/booking'], { queryParams: { page: 1, passenger: 30} });
}

  ngOnInit() {
    this.createForm();
  }

}
