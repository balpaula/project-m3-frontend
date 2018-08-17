import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isUser: any;
  @Output() whenLogout = new EventEmitter();
  @Output() showLogIn = new EventEmitter();
  @Output() showSignUp = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleLogIn() {
    this.showLogIn.emit();
  }

  handleSignUp() {
    this.showSignUp.emit();
  }

  handleLogout() {
    this.whenLogout.emit();
  }
}
