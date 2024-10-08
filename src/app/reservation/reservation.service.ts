import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: number): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    let lastElementIndex = this.reservations.length ? this.reservations[this.reservations.length-1].id: 0;
    reservation.id=lastElementIndex + 1;
    this.reservations.push(reservation);
    console.log(this.reservations);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: number): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    console.log(this.reservations);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  editReservation(id: number, modifiedReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id===id);
    this.reservations[index]=modifiedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }
}
