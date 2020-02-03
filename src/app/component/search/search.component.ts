import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookingService } from '../../services/flight-booking.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  depatureDate: Date;
  searchForm: FormGroup;
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
     arraivalDate: ['', Validators.required],
     travellers: ['', Validators.required],
     travelClass: ['', Validators.required],
   });
 }

  ngOnInit() {
    this.createForm();
  }

}
