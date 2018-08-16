import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private httpClient: HttpClient ) { }

  getPosition() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          resolve([position.coords.longitude, position.coords.latitude]);
        } else {
          reject(new Error('no hemos podido obtener la localizacion'));
        }
      });
    });
  }

}
