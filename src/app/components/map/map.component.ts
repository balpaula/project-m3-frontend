import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { resolve } from 'dns';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  lat = 0;
  lng = 0;

  constructor() { }

  ngOnInit() {
      this.getPosition();
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
      // console.log([position.coords.longitude, position.coords.latitude]);
      // return [position.coords.longitude, position.coords.latitude];
      this.drawMap();
    });
  }

  drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXNib2FyZHMiLCJhIjoiY2prdHB4OTZuMDdtYjNrbGtvOGN1NGtqbyJ9.E8XQXS19fMbyyJY8PtiXaQ';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
      center: [this.lng, this.lat] , // starting position [lng, lat]
      zoom: 15 // starting zoom
    });
    new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
  }
}
