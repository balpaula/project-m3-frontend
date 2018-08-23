import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  private map: any;
  private mapChange: Subject<any> = new Subject();
  private markers = [];
  private markersChange: Subject<any> = new Subject();

  mapChange$: Observable<any> = this.mapChange.asObservable();
  markersChange$: Observable<any> = this.markersChange.asObservable();

  constructor( private httpClient: HttpClient) { }

  drawMap(coordinates) {
    const center = new mapboxgl.LngLat(coordinates[0], coordinates[1]);
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXNib2FyZHMiLCJhIjoiY2prdHB4OTZuMDdtYjNrbGtvOGN1NGtqbyJ9.E8XQXS19fMbyyJY8PtiXaQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center,
      zoom: 12
    });
    this.mapChange.next(this.map);
    return this.map;
  }

  drawMarker(place, map) {
    const imageTag = `<img src=${place.photo} width="200px">`;
    const description = `
      <h3>${place.name}</h3>
      <div>
        <p style="width: 200px">
          ${place.description}
        </p>
      </div>
      ${place.photo ? imageTag : ''}
    `;
    const popup = new mapboxgl.Popup({ offset: 40, height: 200 }).setHTML(description);

    const marker = new mapboxgl.Marker()
      .setLngLat(place.coordinates)
      .setPopup(popup)
      .addTo(map);

    this.markers.push(marker);
  }

  drawMarkerCurrentLocation(coordinates, map) {
    const popup = new mapboxgl.Popup({ offset: 40 })
      // .setText(place.description);
      .setText('You are here!');
    const marker = new mapboxgl.Marker({color: '#EF5350'})
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);
  }

  drawAllMarkers(places, map, options?) {
    this.eraseAllMarkers();
    places.forEach(place => {
      this.drawMarker(place, map);
    });
  }

  private eraseAllMarkers() {
    this.markers.forEach(marker => {
      marker.remove();
    });
  }

  centerMap(coordinates) {
    this.map.center = coordinates;
  }

  getMap() {
    return this.map;
  }

  getMarkers() {
    return this.markers;
  }

}
