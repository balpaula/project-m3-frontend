import { Component, OnInit, OnDestroy } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { SelectMultipleControlValueAccessor } from '../../../../node_modules/@angular/forms';
import { LocationService } from '../../services/location.service';
import { DrawService } from '../../services/draw.service';
import { TripsService } from '../../services/trips.service';
import { PlacesService } from '../../services/places.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  user: any;

  map: any;
  currentTrip: any;
  places = [];
  coordinates: any;

  favorites = [];
  isFavorite: boolean;

  showUsername: boolean;

  showFavoriteStar = true;

  subscriptionMap: any;
  subscriptionPlaces: any;
  subscriptionCurrentTrip: any;
  subscriptionFavorites: any;

  constructor(
    private locationService: LocationService,
    private drawService: DrawService,
    private tripsService: TripsService,
    private placesService: PlacesService,
    private authService: AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    // Subscribe to map changes for centering
    this.subscriptionMap = this.drawService.mapChange$.subscribe((map) => {
        this.map = map;
      });

    // Subscribe to places changes for when adding a new place
    this.subscriptionPlaces = this.placesService.placesChange$.subscribe((places) => {
      this.places = places;
      this.drawService.drawAllMarkers(places, this.map);
    });

    // Subscribe to trip changes for when changing the trip
    this.currentTrip = this.tripsService.currentTrip;
    this.subscriptionCurrentTrip = this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
      if (this.map) {
        this.handleCurrentTripChange();
      }
      this.handleShowUsername();
      this.handleShowFavorites();
    });

    this.subscriptionFavorites = this.tripsService.favoritesChange$.subscribe((favorites) => {
      this.favorites = favorites;
      this.setIsFavorite();
    });

    // Initialization of the map
    this.initMap();
  }

  ngOnDestroy() {
    this.subscriptionMap.unsubscribe();
    this.subscriptionPlaces.unsubscribe();
    this.subscriptionCurrentTrip.unsubscribe();
    this.subscriptionFavorites.unsubscribe();
  }

  initMap() {
    this.locationService.getPosition()
        .then(coordinates => {
          // draw map according to current position
          this.coordinates = coordinates;
          this.drawService.drawMap(coordinates);
        })
        .then(() => {
          // associate maps
          this.map = this.drawService.getMap();
        })
        .then(() => {
          this.currentTrip = this.tripsService.currentTrip;
        })
        .then(() => {
          if (this.tripsService.exploring) {
            this.handleShowUsername();
            this.handleCurrentTripChange();
            this.tripsService.exploring = undefined;
          }
        })
        .then(() => {
          this.tripsService.getFavorites();
        })
        .then(() => {
          // if there are already places in that trip, draw the markers
          this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
          if (this.currentTrip.places) {
            this.setAllMarkers();
          }
        })
        .catch(error => {
          console.log("Couldn't set the map with markers");
        });
  }

  handleCurrentTripChange() {
      if (this.currentTrip.places.length){
        // if there are already places added to that trip center the map to last one and draw markers
        this.drawService.drawMap(this.currentTrip.places[this.currentTrip.places.length-1].coordinates)
        this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
        this.setAllMarkers();
      } else {
        // if the trip is empty (new trip, for example), init map (will set to current position)
        this.changeToEmptyMap();
      }
  }

  changeToEmptyMap() {
    this.drawService.drawMap(this.coordinates);
    this.drawService.drawMarkerCurrentLocation(this.coordinates,this.map);
  }

  setAllMarkers() {
    this.drawService.drawAllMarkers(this.currentTrip.places, this.map);
  }

  setIsFavorite() {
    const favoritesId = this.favorites.map(element => {
      return element._id;
    });
    if (favoritesId.includes(this.currentTrip._id)) {
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

  handleShowUsername() {
    if (this.tripsService.exploring && (this.currentTrip.owner._id !== this.user._id)) {
      this.showUsername = true;
    } else {
      this.showUsername = false;
    }
  }

  handleShowFavorites() {
    if (this.tripsService.showingAllTrips) {
      this.showFavoriteStar = false;
    } else {
      this.showFavoriteStar = true;
    }
  }

  handleGoToProfile(username) {
    this.router.navigate(['/profile', username]);
  }

}

