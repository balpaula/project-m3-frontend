import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private API_URL = environment.API_URL;

  public places: any;
  private placesChange: Subject<any> = new Subject();

  placesChange$: Observable<any> = this.placesChange.asObservable();

  constructor( private httpClient: HttpClient ) { }

  private setPlaces(places: Array<any>) {
    this.places = places;
    this.placesChange.next(places);
    return places;
  }

  addPlace(place: any, trip: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/trips/${trip._id}/addplace`, place, options)
      .toPromise()
      .then((places: Array<any>) => {
        this.setPlaces(places);
      });
  }
}
