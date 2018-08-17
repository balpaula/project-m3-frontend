import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isUser: any;
  @Output() whenLogout = new EventEmitter();

  showLogin = false;
  showSignup = false;

  constructor() { }

  ngOnInit() {
  }

  handleSignup() {
    if (this.showSignup) {
      this.showSignup = false;
    } else {
      this.showSignup = true;
      this.showLogin = false;
    }
  }

  handleLogin() {
    if (this.showLogin) {
      this.showLogin = false;
    } else {
      this.showLogin = true;
      this.showSignup = false;
    }
  }

  handleLogout() {
    this.whenLogout.emit();
  }
}
