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
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: coordinates,
      zoom: 12
    });
    this.map = map;
    this.mapChange.next(map);
    return map;
  }

  drawMarker(place, map) {
    const description = `<h3>${place.name}</h3><p>${place.description}</p>`;
    const popup = new mapboxgl.Popup({ offset: 40 })
      //.setText(place.description);
      .setHTML(description);

    const marker = new mapboxgl.Marker()
      .setLngLat(place.coordinates)
      .setPopup(popup)
      .addTo(map);
    this.markers.push(marker);
  }

  drawMarkerCurrentLocation(coordinates, map) {
    const popup = new mapboxgl.Popup({ offset: 40 })
      //.setText(place.description);
      .setText("You're here!");
    const marker = new mapboxgl.Marker({color: '#E53935'})
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);
  }

  drawAllMarkers(places, map, options?) {
    this.eraseAllMarkers();
    places.forEach(place => {
      console.log(place);
      this.drawMarker(place, map);
    });
  }

  private eraseAllMarkers() {
    this.markers.forEach(marker => {
      marker.remove();
    })
  }

  centerMap(coordinates) {
    this.map.center = coordinates;
  }

}
