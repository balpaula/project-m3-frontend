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
    this.tripsService.getTrips()
      .then(() => {
        console.log('i got the trips!');
        return this.tripsService.setDefaultTrip();
      })
      .then(() => {
        console.log('2nd promise!');
        return this.tripsService.currentTripChange$.subscribe((currentTrip) => {
          this.currentTrip = currentTrip;
        })
      })
      .then(() => {
        console.log('3rd promise!');
      })
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
  }

}
