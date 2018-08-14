import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @Input() isUser: any;
  // @Output() whenLogout = new EventEmitter();


  name: '';

  constructor() { }

  ngOnInit() {
  }

  handleLogout() {
    this.whenLogout.emit(this.name);
  }
}
