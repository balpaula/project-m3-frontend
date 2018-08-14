import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class SetMapService {

  constructor( private httpClient: HttpClient ) { }

  const getPosition = new Promise(function(resolve, reject) {
    const coordinates = navigator.geolocation.getCurrentPosition((position) => {
      return [position.coords.longitude, position.coords.latitude];
    });
    if (coordinates) {
      resolve({coordinates});
    } else {
      reject(Error);
    }
  });

  // getPosition(cb?) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const coordinates = [position.coords.longitude, position.coords.latitude];
  //     if (cb) {
  //       cb(coordinates);
  //     }
  //     return coordinates;
  //   });
  // }

  drawMarker(coordinates, map) {
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  }

}
