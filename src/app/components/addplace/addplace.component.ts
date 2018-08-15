import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.css']
})
export class AddplaceComponent implements OnInit {

  constructor( private locationService: LocationService, private tripsService: TripsService ) { }

  ngOnInit() {
  }



}
