import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { TripsService } from '../../services/trips.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.css']
})
export class AddplaceComponent implements OnInit {

  name: string;
  description: string;

  currentTrip: any;

  constructor( private locationService: LocationService, private tripsService: TripsService, private placesService: PlacesService ) { }

  ngOnInit() {
    this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
    })
  }

  submitForm(form) {
    this.locationService.getPosition()
      .then(coordinates => {
        this.placesService.addPlace({
          id: this.currentTrip._id,
          name: this.name,
          coordinates,
          description: this.description
        }, this.currentTrip)
      })
  }

}
