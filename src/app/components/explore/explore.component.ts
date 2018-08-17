import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  tripsExplore: Array<any>;

  constructor( private tripsService: TripsService ) { }

  ngOnInit() {
    this.tripsService.getExplore()
      .then((trips) => {
        console.log(trips);
        this.tripsExplore = trips;
        console.log(this.tripsExplore);
      })
    
  }

  handleClick() {
    
  }

}
