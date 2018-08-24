import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  profile: any;

  username: any;
  description = '';
  trips: Array<any>;
  favorites: Array<any>;

  showEditDescription = false;
  showForm = false;

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private statusService: StatusService ) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.statusService.profileChange$.subscribe((profile) => {
      this.profile = profile;
      this.description = this.profile.description;
      this.username = this.profile.username;
      if (this.profile.username === this.user.username) {
        this.showEditDescription = true;
      } else {
        this.showEditDescription = false;
      }
      this.tripsService.getTripsFromUser(profile._id)
        .then(trips => {
          this.trips = trips;
        })
        .catch(error => {
          console.log(error);
        });
      this.tripsService.getFavoritesFromUser(profile._id)
        .then(favorites => {
          this.favorites = favorites;
        })
        .catch(error => {
          console.log(error);
        });
    });

    this.route.params.subscribe((value) => {
      this.profileService.getOne(value.username)
        .then(profile => {
          this.statusService.changeProfile(profile);
        })
        .catch(error => {
          console.error('Could not get the searched user');
        });
    });

    this.statusService.hideAddPlace();
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
    this.tripsService.exploring = trip._id;
    this.router.navigate(['/trips']);
  }

  handleExploreFavorite(id) {
    this.tripsService.exploring = id;
    this.router.navigate(['/trips']);
  }

  handleClickUsername(username) {
    this.router.navigate(['/profile', username]);
    
  }

  handleEdit() {
    this.showEditDescription = false;
    this.showForm = true;
  }

  submitForm(form) {
    this.profileService.updateDescription({
      description: this.description
    })
    .then(() => {
      this.showForm = false;
      this.showEditDescription = true;
    })
    .catch(error => {
      console.log('Could not update the description');
    });
  }
}
