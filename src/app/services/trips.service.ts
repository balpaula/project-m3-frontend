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
  public exploring: any;
  public favorites = [];
  private favoritesChange: Subject<any> = new Subject();


  tripsChange$: Observable<any> = this.tripsChange.asObservable();
  currentTripChange$: Observable<any> = this.currentTripChange.asObservable();
  favoritesChange$: Observable<any> = this.favoritesChange.asObservable();

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

  private setFavorites(favorites: Array<any>) {
    this.favorites = favorites;
    this.favoritesChange.next(favorites);
    return favorites;
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

  getFavorites(): Promise<any> {
    const options = {
      withCredentials: true
    };
    console.log('favorites from service')
    return this.httpClient.get(`${this.API_URL}/trips/favorites`, options)
      .toPromise()
      .then((favorites: any) => {
        this.setFavorites(favorites);
      });
  }

  addFavorite(tripId): Promise<any> {
    console.log('add to favorites');
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/trips/${tripId}/favorite`, tripId, options)
      .toPromise()
      .then(favorites => {
        this.getFavorites();
      });
  }

  deleteFavorite(tripId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.API_URL}/trips/${tripId}/favorite`, options)
      .toPromise()
      .then(favorites => {
        this.getFavorites();
      });
  }

  public setDefaultTrip() {
    if (this.trips.length) {
      this.getOneTrip(this.trips[this.trips.length - 1]._id);
    }
  }

  public setExploreTrip() {
    this.getOneTrip(this.exploring);
    console.log('exploring', this.exploring)
  }

  public changeTrip(trip) {
    this.getOneTrip(trip._id);
  }

}
