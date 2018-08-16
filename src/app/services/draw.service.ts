import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor( private httpClient: HttpClient) { }

  drawMarker(coordinates, map) {
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  }

  drawAllMarkers(trip, map, options?) {
    trip.places.forEach(place => {
      this.drawMarker(place.coordinates, map);
    });
  }

}
