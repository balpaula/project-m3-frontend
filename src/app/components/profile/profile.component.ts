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

    this.route.params.subscribe((value) => {
      this.profileService.getOne(value.username)
        .then(profile => {
          this.description = profile.description;
          this.favorites = profile.favorites;
          if (profile.username === this.user.username) {
            this.showEditDescription = true;
          }
          this.tripsService.getTripsFromUser(profile._id)
            .then(trips => {
              this.trips = trips;
            })
        })
        .catch(error => {
          console.error("Couldn't get the searched user");
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
      console.log("Couldn't update the description");
    })
  }
}
