import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isUser: any;
  @Output() whenLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleLogout() {
    this.whenLogout.emit();
  }
}
