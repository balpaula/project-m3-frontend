import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.css']
})
export class TripsPageComponent implements OnInit {

  @Input() isTripsPage = true;

  showAddPlace: boolean;

  constructor( private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.addPlaceChange$.subscribe((bool) => {
      this.showAddPlace = bool;
    });
    this.showAddPlace = true;
  }

}
