import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { SelectMultipleControlValueAccessor } from '../../../../node_modules/@angular/forms';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  lat = 0;
  lng = 0;

  constructor( private mapService: LocationService ) { }

  ngOnInit() {
      this.mapService.getPosition()
        .then(coordinates => {
          this.drawMap(coordinates);
          return coordinates;
        })
        .then(coordinates => {
          this.mapService.drawMarker(coordinates, this.map);
        })
        .catch(error => {
          console.log(error);
        });
  }

  drawMap(coordinates) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXNib2FyZHMiLCJhIjoiY2prdHB4OTZuMDdtYjNrbGtvOGN1NGtqbyJ9.E8XQXS19fMbyyJY8PtiXaQ';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
      center: coordinates , // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
  }
}
