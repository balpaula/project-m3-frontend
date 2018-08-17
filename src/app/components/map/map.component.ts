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
  coordinates: any;

  constructor( private locationService: LocationService, private drawService: DrawService, private tripsService: TripsService, private placesService: PlacesService ) { }

  ngOnInit() {

    //Subscribe to map changes for centering
      this.drawService.mapChange$.subscribe((map) => {
        this.map = map;
      });

    //Subscribe to places changes for when adding a new place
      this.placesService.placesChange$.subscribe((places) => {
        this.places = places;
        this.drawService.drawAllMarkers(places, this.map);
      });

    //Subscribe to trip changes for when changing the trip
      this.tripsService.currentTripChange$.subscribe((currentTrip) => {
        this.currentTrip = currentTrip;
        if (this.map) {
          this.handleCurrentTripChange();
        }
      });

    //Initialization of the map
      this.initMap();
  }

  initMap() {
    this.locationService.getPosition()
        .then(coordinates => {
          //draw map according to current position
          this.coordinates = coordinates;
          this.drawService.drawMap(coordinates);
        })
        .then(() => {
          //associate maps
          this.map = this.drawService.map;
        })
        .then(() => {
          this.currentTrip = this.tripsService.currentTrip;
        })
        .then(() => {
          if (this.tripsService.exploring) {
            this.handleCurrentTripChange();
            this.tripsService.exploring = '';
          }
        })
        .then(() => {
          //if there are already places in that trip, draw the markers
          this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
          if (this.currentTrip.places) {
            this.drawAllMarkers();
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  handleCurrentTripChange() {
    //when there is a change of current trip coming from the navbar
    //only takes places if the map has been drawn
      if (this.currentTrip.places.length){
        //if there are already places added to that trip center the map to last one and draw markers
        this.drawService.drawMap(this.currentTrip.places[this.currentTrip.places.length-1].coordinates);
        this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
        this.drawAllMarkers();
      } else {
        //if the trip is empty (new trip, for example), init map (will set to current position)
        this.initMap();
      }
  }

  drawAllMarkers() {
    this.drawService.drawAllMarkers(this.currentTrip.places, this.map);
  }

}

