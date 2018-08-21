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

  constructor( private tripsService: TripsService, private router: Router, private statusService: StatusService ) { }

  ngOnInit() {
    this.tripsService.getExplore()
      .then((trips) => {
        this.tripsExplore = trips;
      })

    this.statusService.hideAddPlace();    
  }

  handleClick(id) {
    this.tripsService.exploring = id;
    this.router.navigate(['/trips']);
  }

}
