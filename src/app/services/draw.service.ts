import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  public map: any;
  private mapChange: Subject<any> = new Subject();
  public markers = [];
  private markersChange: Subject<any> = new Subject();

  mapChange$: Observable<any> = this.mapChange.asObservable();
  markersChange$: Observable<any> = this.markersChange.asObservable();

  constructor( private httpClient: HttpClient) { }

  drawMap(coordinates) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXNib2FyZHMiLCJhIjoiY2prdHB4OTZuMDdtYjNrbGtvOGN1NGtqbyJ9.E8XQXS19fMbyyJY8PtiXaQ';
    let map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
      center: coordinates , // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
    this.map = map;
    this.mapChange.next(map);
    return map;
  }

  drawMarker(place, map) {
    const popup = new mapboxgl.Popup({ offset: 40 })
      .setText(place.description);

    const marker = new mapboxgl.Marker()
      .setLngLat(place.coordinates)
      .setPopup(popup)
      .addTo(map);
    this.markers.push(marker);
  }

  drawAllMarkers(trip, map, options?) {
    this.eraseAllMarkers();
    trip.places.forEach(place => {
      this.drawMarker(place, map);
    });
  }

  private eraseAllMarkers() {
    this.markers.forEach(marker => {
      marker.remove();
    })
  }

}
