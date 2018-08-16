import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private API_URL = environment.API_URL;

  constructor( private httpClient: HttpClient ) { }

  addPlace(place: any, trip: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/${trip._id}/addplace`, place, options)
      .toPromise()
  }
}
