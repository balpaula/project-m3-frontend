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

  favorites = [];
  isFavorite: boolean;

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

      this.tripsService.favoritesChange$.subscribe((favorites) => {
        this.favorites = favorites;
        this.setIsFavorite();
      });

    //Initialization of the map
      this.initMap();
    
    //Set favorites
      // this.tripsService.getFavorites();
      
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
          this.tripsService.getFavorites();
        })
        .then(() => {
          //if there are already places in that trip, draw the markers
          this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
          if (this.currentTrip.places) {
            this.setAllMarkers();
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  handleCurrentTripChange() {
      if (this.currentTrip.places.length){
        //if there are already places added to that trip center the map to last one and draw markers
        this.drawService.drawMap(this.currentTrip.places[this.currentTrip.places.length-1].coordinates);
        this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
        this.setAllMarkers();
      } else {
        //if the trip is empty (new trip, for example), init map (will set to current position)
        this.initMap();
      }  
  }

  setAllMarkers() {
    this.drawService.drawAllMarkers(this.currentTrip.places, this.map);
  }

  setIsFavorite() {
    console.log('set is favorite');
    if (this.favorites.includes(this.currentTrip._id)) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }

  handleAddFavorite() {
    this.tripsService.addFavorite(this.currentTrip._id);
  }

  handleDeleteFavorite() {
    this.tripsService.deleteFavorite(this.currentTrip._id);
  }

}

