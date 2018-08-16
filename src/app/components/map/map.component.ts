import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { SelectMultipleControlValueAccessor } from '../../../../node_modules/@angular/forms';
import { LocationService } from '../../services/location.service';
import { DrawService } from '../../services/draw.service';
import { TripsService } from '../../services/trips.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  markers: any;
  currentTrip: any;

  constructor( private locationService: LocationService, private drawService: DrawService, private tripsService: TripsService ) { }

  ngOnInit() {
      this.drawService.mapChange$.subscribe((map) => {
        this.map = map;
      });
      this.drawService.markersChange$.subscribe((markers) => {
        this.markers = markers;
      });
      this.tripsService.currentTripChange$.subscribe((currentTrip) => {
        this.currentTrip = currentTrip;
        if (this.map) {
          this.drawService.drawAllMarkers(this.currentTrip, this.map);
        }
      });
      this.locationService.getPosition()
        .then(coordinates => {
          this.drawService.drawMap(coordinates);
        })
        .then(() => {
          this.map = this.drawService.map;
        })
        .then(() => {
          this.drawService.drawAllMarkers(this.currentTrip, this.map);
        })
        .catch(error => {
          console.log(error);
        });
  }

}

