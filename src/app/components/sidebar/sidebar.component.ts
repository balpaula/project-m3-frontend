import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  trips = [];

  constructor( private tripsService: TripsService) { }

  ngOnInit() {
    this.tripsService.tripsChange$.subscribe((trips) => {
      // this.loading = false;
      this.trips = trips;
    });
    this.tripsService.getTrips();
  }

}
