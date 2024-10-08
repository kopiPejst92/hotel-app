import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.reservationService.getReservation(Number(id)).subscribe(reservation => {
        if (reservation)
          this.reservationForm.patchValue(reservation)
      })
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if (id) {
        reservation.id = Number(id)
        this.reservationService.editReservation(Number(id), reservation).subscribe(() => {
          console.log("Reservation has been modified")
        })
      } else {
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Reservation has been added")
        });

      }
      this.router.navigate(['/list'])
    }
  }
}
