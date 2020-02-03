import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FlightBookingService } from '../../services/flight-booking.service';
import { Router } from '@angular/router';
import { MessageSubscriptionService } from "./../../services/message-subscription.service";
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  loginForm: FormGroup;
  loginScreen = false;
  loader = false;
  paymenttype: FormGroup;


  flightDeatils = {
    flightName: 'Air Asia',
    departureLocation: 'Bangalore',
    arrivalLocation: 'Chennai',
    departureDate: new Date(),
    duration: new Date().getTime(),
    departureTime: new Date(),
    arrivalTime: new Date().getTime(),
    price: 2000,
    travelId: 2,
    flightId: 45
  };


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flightService: FlightBookingService,
    private messageServive: MessageSubscriptionService
  ) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      tickets: new FormArray([])
    });
    this.createForm();
    this.onChangeTickets(2);

    this.paymenttype = new FormGroup({

    });
  }


  /* Create form group object for login form
  */
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
  * @param
  * Get login form controll access
  */
  get login() { return this.loginForm.controls; }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          passengerName: ['', Validators.required],
          passengerAge: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  /*
  * @param Login Validate
  * Validate login form with credentials
  * @input sapId and password
  */
  validateLogin() {
    if (this.loginForm.valid) {
      const postObj = {
        phoneNumber: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      // tslint:disable-next-line: deprecation
      this.flightService.checkLogin(postObj).subscribe(user => {
        console.log(user);
        if (user) {
          const userDetails = {
            customerName: user.customerName,
            customerId: user.customerId
          };
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.messageServive.sendMessage(user);
          this.router.navigate(['dashboard']);
          this.loader = false;
        }
      }, error => {
        this.loader = false;
      });
    }
  }

  onSubmit() {
    alert('test');
    this.submitted = true;
    this.loginScreen = true;
    // stop here if form is invalid
    // if (this.dynamicForm.invalid) {
    //   return;
    // }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

}
