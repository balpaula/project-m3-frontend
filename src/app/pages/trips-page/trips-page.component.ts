import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.css']
})
export class TripsPageComponent implements OnInit {

  @Input() isTripsPage=true;

  constructor() { }

  ngOnInit() {
  }

}
