import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { SelectMultipleControlValueAccessor } from '../../../../node_modules/@angular/forms';
import { LocationService } from '../../services/location.service';
import { DrawService } from '../../services/draw.service';
import { TripsService } from '../../services/trips.service';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  currentTrip: any;
  places = [];

  constructor( private locationService: LocationService, private drawService: DrawService, private tripsService: TripsService, private placesService: PlacesService ) { }

  ngOnInit() {
      this.drawService.mapChange$.subscribe((map) => {
        this.map = map;
      });
      this.placesService.placesChange$.subscribe((places) => {
        this.places = places;
        this.drawService.drawAllMarkers(places, this.map);
      });
      this.tripsService.currentTripChange$.subscribe((currentTrip) => {
        this.currentTrip = currentTrip;
        this.handleCurrentTripChange();
      });
      this.initMap();
  }

  initMap() {
    this.locationService.getPosition()
        .then(coordinates => {
          this.drawService.drawMap(coordinates);
        })
        .then(() => {
          this.map = this.drawService.map;
        })
        .then(() => {
          if (this.places.length) {
            this.drawService.drawAllMarkers(this.currentTrip.places, this.map);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  handleCurrentTripChange() {
    if (this.map) {
      if (this.currentTrip.places.length){
        this.drawService.drawMap(this.currentTrip.places[this.currentTrip.places.length-1].coordinates);
      } else {
        this.initMap();
      }
      this.drawService.drawAllMarkers(this.currentTrip.places, this.map);
    }
  }

}

