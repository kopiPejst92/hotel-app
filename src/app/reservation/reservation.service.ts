import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3000"
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations")
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
  }

  addReservation(reservation: Reservation):  Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservation", reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/"+id);
  }

  editReservation(id: number, modifiedReservation: Reservation):  Observable<void> {
    return this.http.put<void>(this.apiUrl + "/reservation/"+id, modifiedReservation);
  }
}
