import { Component, OnInit, Input } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  trips = [];
  currentTrip: any;
  user: any;
  @Input() isTripsPage;

  showForm = false;

  constructor( private tripsService: TripsService, 
    private router: Router, 
    private authService: AuthService, 
    private statusService: StatusService ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.tripsService.tripsChange$.subscribe((trips) => {
      this.trips = trips;
    });
    this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
      this.checkUser();
    });
    this.tripsService.getTrips()
      .then(() => {
        if (this.tripsService.exploring) {
          this.tripsService.setExploreTrip();
        } else {
          this.tripsService.setDefaultTrip();
        }
      })
      .catch(error => {
        console.log("Couldn't charge trips in sidebar");
      });

    this.statusService.createTripChange$.subscribe((bool) => {
      this.showForm = bool;
    })
  }

  handleChangeOfTrip(trip) {
    this.tripsService.changeTrip(trip);
    this.tripsService.setExploringFalse();
  }

  handleClick() {
    this.showForm = !this.showForm;
    if (this.showForm === true) {
      this.statusService.hideAddPlace();
    } 
    if (this.showForm === false) {
      this.checkUser();
    }
  }

  checkUser() {
    if (this.user._id === this.currentTrip.owner._id){
      this.statusService.showAddPlace();
    } else {
      this.statusService.hideAddPlace();
    }
  }

}
