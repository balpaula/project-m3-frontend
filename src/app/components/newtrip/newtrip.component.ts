import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-newtrip',
  templateUrl: './newtrip.component.html',
  styleUrls: ['./newtrip.component.css']
})
export class NewtripComponent implements OnInit {

  name: string;
  description: string;

  constructor( private tripsService: TripsService) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.tripsService.createTrip({
      name: this.name,
      description: this.description
    })
  }

}
