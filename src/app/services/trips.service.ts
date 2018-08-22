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
  public showingAllTrips: boolean;
  public favorites = [];
  private favoritesChange: Subject<any> = new Subject();
  public searchResults = [];
  private searchResultsChange: Subject<any> = new Subject();


  tripsChange$: Observable<any> = this.tripsChange.asObservable();
  currentTripChange$: Observable<any> = this.currentTripChange.asObservable();
  favoritesChange$: Observable<any> = this.favoritesChange.asObservable();
  searchResultsChange$: Observable<any> = this.searchResultsChange.asObservable();

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

  private setSearchResults(searchResults: Array<any>) {
    this.searchResults = searchResults;
    this.searchResultsChange.next(searchResults);
    return searchResults;
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

  getTripsFromUser(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/trips/user/${userId}`, options)
      .toPromise()
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

  getSearch(text): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/explore/search/${text}`, options)
      .toPromise()
      .then((results: Array<any>) => {
        this.setSearchResults(results);
      })
  }

  getFavorites(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/trips/favorites`, options)
      .toPromise()
      .then((favorites: Array<any>) => {
        this.setFavorites(favorites);
      });
  }

  getFavoritesFromUser(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/trips/favorites/${userId}`, options)
      .toPromise()
  }

  addFavorite(tripId): Promise<any> {
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
  }

  public changeTrip(trip) {
    this.getOneTrip(trip._id);
  }

  getAllTrips() {
    return this.trips;
  }

  getCurrentTrip() {
    return this.currentTrip();
  }

  setExploringFalse() {
    this.exploring = undefined;
  }

  allPlaces() {
    const placesAll = [];
    this.trips.forEach(trip => {
      trip.places.forEach(place => {
        placesAll.push(place);
      })
    })
    const newTrip = this.currentTrip;
    newTrip.places = placesAll;
    this.setCurrentTrip(newTrip);
    this.setShowingAllTripsTrue();
  }

  setShowingAllTripsFalse() {
    this.showingAllTrips = false;
  }

  setShowingAllTripsTrue() {
    this.showingAllTrips = true;
  }
  

}
