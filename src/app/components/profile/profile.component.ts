import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  trips: any;
  favorites: any;

  constructor( private tripsService: TripsService, private router: Router ) { }

  ngOnInit() {
    this.trips = this.tripsService.trips;
    this.favorites = this.tripsService.favorites;

    this.tripsService.favoritesChange$.subscribe((favorites) => {
      this.favorites = favorites;
    });
    
    this.tripsService.favoritesChange$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
    this.router.navigate(['/trips']);
  }

  handleExploreFavorite(id) {
    this.tripsService.exploring = id;
    this.router.navigate(['/trips']);
  }
}
