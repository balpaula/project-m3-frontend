import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-newtrip',
  templateUrl: './newtrip.component.html',
  styleUrls: ['./newtrip.component.css']
})
export class NewtripComponent implements OnInit {

  name: string;
  description: string;

  constructor( private tripsService: TripsService,
    private statusService: StatusService ) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.tripsService.createTrip({
      name: this.name,
      description: this.description
    });
    this.statusService.hideCreateTrip();
  }
}
