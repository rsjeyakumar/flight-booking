import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      tickets: new FormArray([])
    });

    this.onChangeTickets(2);
  }

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

  onSubmit() {
    alert('test');
    this.submitted = true;

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
