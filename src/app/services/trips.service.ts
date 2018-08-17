import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private API_URL = environment.API_URL;
  private trips = [];
  private tripsChange: Subject<any> = new Subject();
  public currentTrip: any;
  private currentTripChange: Subject<any> = new Subject();


  tripsChange$: Observable<any> = this.tripsChange.asObservable();
  currentTripChange$: Observable<any> = this.currentTripChange.asObservable();

  constructor( private httpClient: HttpClient ) { }

  private setTrips(trips: Array<any>) {
    this.trips = trips;
    this.tripsChange.next(trips);
    return trips;
  }

  private setCurrentTrip(trip: any) {
    this.currentTrip = trip;
    this.currentTripChange.next(trip);
    return trip;
  }

  getTrips(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/trips/list`, options)
      .toPromise()
      .then((trips: Array<any>) => {
        this.setTrips(trips);
      });
  }

  getOneTrip(tripId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/trips/${tripId}`, options)
      .toPromise()
      .then((trip: any) => {
        this.setCurrentTrip(trip);
      })
  }

  createTrip(trip: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/trips/new`, trip, options)
      .toPromise()
      .then((newTrip) => {
        this.getTrips();
        return newTrip;
      })
      .then((newTrip) => {
        this.changeTrip(newTrip);
      });
  }

  getExplore(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/explore`, options)
      .toPromise()
  }

  public setDefaultTrip() {
    if (this.trips.length) {
      this.getOneTrip(this.trips[this.trips.length - 1]._id);
    }
  }

  public changeTrip(trip) {
    this.getOneTrip(trip._id);
  }

}
