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


  tripsChange$: Observable<any> = this.tripsChange.asObservable();

  constructor( private httpClient: HttpClient ) { }

  private setTrips(trips: Array<any>) {
    this.trips = trips;
    this.tripsChange.next(trips);
    return trips;
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

  createTrip(trip: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/trips/new`, trip, options)
      .toPromise()
      .then(() => {
        this.getTrips();
      });
  }

}
