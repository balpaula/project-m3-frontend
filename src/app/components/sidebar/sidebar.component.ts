import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  trips = [];
  currentTrip = {};

  constructor( private tripsService: TripsService) { }

  ngOnInit() {
    this.tripsService.tripsChange$.subscribe((trips) => {
      this.trips = trips;
    });
    this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
    });
    this.tripsService.getTrips()
      .then(() => {
        this.tripsService.setDefaultTrip();
      })
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
  }

}
