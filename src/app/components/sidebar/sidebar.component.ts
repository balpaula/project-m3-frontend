import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  trips = [];
  currentTrip = {};

  inMyTrips: boolean;

  constructor( private tripsService: TripsService, private router: Router ) { }

  ngOnInit() {
    this.tripsService.tripsChange$.subscribe((trips) => {
      this.trips = trips;
    });
    this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
    });
    this.tripsService.getTrips()
      .then(() => {
        if (this.tripsService.exploring) {
          this.tripsService.setExploreTrip();
        } else {
          this.tripsService.setDefaultTrip();
        }
      })
    if (this.router.url === '/trips') {
      this.inMyTrips = true;
    }
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
  }

}
