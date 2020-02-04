import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookingService } from '../../services/flight-booking.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  cancelForm: FormGroup;
  loader: false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flightService: FlightBookingService,
  ) {}

  /*
  * @param
  * Get login form controll access
  */
 get cancel() { return this.cancelForm.controls; }

 /*
  * @param create form
  * Create form group object for login form
  */
 createForm() {
   this.cancelForm = this.formBuilder.group({
     ticketId: ['', Validators.required],
     name: ['', Validators.required]
   });
 }

  ngOnInit() {
    this.createForm();
  }

}
