import { Component, OnInit, Input } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  trips = [];
  currentTrip = {};
  user: any;
  @Input() isTripsPage;


  constructor( private tripsService: TripsService, private router: Router, private authService: AuthService ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
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
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
  }

}
