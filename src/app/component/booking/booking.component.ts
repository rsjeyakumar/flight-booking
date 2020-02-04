import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FlightBookingService } from '../../services/flight-booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageSubscriptionService } from "./../../services/message-subscription.service";
import swal from 'sweetalert';
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
  paramDetails;
  taxPrice: number;
  totalPrice: number;
  checkLogin = false;
  checkbeforeLogin = false;
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
    private route: ActivatedRoute,
    public flightService: FlightBookingService,
    private messageServive: MessageSubscriptionService
  ) {
      this.route.queryParams.subscribe(params => {
        this.paramDetails = params;
      // this.noOfPassengers = params.noOfPassenger;
      // this.ticketId = params.ticketId;
      // this.departureTime =  params.depatureTime;
      // this.arrivalTime = params.arraivalTime;
      // this.price = params.price;
      // this.flightName = params.flight;
  });
   }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      PassengerDetailsList: new FormArray([])
    });
    this.createForm();
    this.onChangeTickets(this.paramDetails.noOfPassenger);
    this.paymenttype = new FormGroup({

    });
    this.taxPrice = (this.paramDetails.price * this.paramDetails.noOfPassenger * 5 / 100);
    this.totalPrice = this.paramDetails.price * this.paramDetails.noOfPassenger + this.taxPrice;
    this.checkBookingLogin();
  }


  checkBookingLogin() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      this.checkLogin = true;
      this.checkbeforeLogin = false;
    } else {
      this.checkLogin = false;
      this.checkbeforeLogin = true;
    }
  }
  /* Create form group object for login form
  */
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /*
  * @param
  * Get login form controll access
  */
  get login() { return this.loginForm.controls; }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.PassengerDetailsList as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          passengerName: ['', Validators.required],
          passengerAge: ['', [Validators.required]]
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
      this.loginScreen = false;
      const postObj = {
        mobileNumber: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      // tslint:disable-next-line: deprecation
      this.flightService.checkLogin(postObj).subscribe(user => {
        console.log(user);
        swal("Good job!", "Logged in successfully", "success");
        if (user) {
          const userDetails = {
            customerName: user.name,
            customerId: user.customerId
          };
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.messageServive.sendMessage(user);
          location.reload();
          this.loader = false;
        }
      }, error => {
        this.loader = false;
      });
    }
  }

  addPassenger() {
    this.submitted = true;
    const postObj = this.dynamicForm.value;
    postObj.travelId = this.paramDetails.travelId;
    if (this.dynamicForm.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(postObj));
    }
  }

  onSubmit() {
    this.loginScreen = true;
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
