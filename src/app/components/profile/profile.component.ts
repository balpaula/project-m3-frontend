import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  trips: any;
  favorites: any;

  currentProfile: any;

  constructor( private tripsService: TripsService, private router: Router, private route: ActivatedRoute, private profileService: ProfileService ) { }

  ngOnInit() {
    this.trips = this.tripsService.trips;
    this.favorites = this.tripsService.favorites;

    this.tripsService.favoritesChange$.subscribe((favorites) => {
      this.favorites = favorites;
    });
    
    this.tripsService.favoritesChange$.subscribe((favorites) => {
      this.favorites = favorites;
    });

    this.route.params.subscribe((value) => {
      console.log(value.username)
      this.profileService.getOne(value.username)
        .then(profile => {
          this.currentProfile = profile;
        })
        .catch(error => {
          console.error(error);
        });
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
