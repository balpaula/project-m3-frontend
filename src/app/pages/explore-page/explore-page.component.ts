import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {

  @Input() isTtripsPage = false;

  constructor() { }

  ngOnInit() {
  }

}
