import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  tripsExplore: Array<any>;
  search = '';
  searchResults = [];

  constructor( private tripsService: TripsService, private router: Router, private statusService: StatusService ) { }

  ngOnInit() {
    this.tripsService.searchResultsChange$.subscribe((results) => {
      this.searchResults = results;     
    });
    this.tripsService.getExplore()
      .then((trips) => {
        this.tripsExplore = trips;
      })
      .catch(error => {
        console.log("Couldn't get the trips");
      })

    this.statusService.hideAddPlace();    
  }

  ngOnDestroy() {
    this.tripsExplore = [];
  }

  handleClickTrip(id) {
    this.tripsService.exploring = id;
    this.router.navigate(['/trips']);
  }

  handleClickUsername(username) {
    this.router.navigate(['/profile', username]);
  }

  handleSearch() {
    console.log(this.search);
    this.tripsService.getSearch(this.search);
  }

}
