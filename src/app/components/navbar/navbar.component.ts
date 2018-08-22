import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Travelist';
  loading = true;
  anon: boolean;
  user: any;

  // @Input() isUser: any;
  // @Output() whenLogout = new EventEmitter();


  showLogin = false;
  showSignup = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
    });
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

  // handleLogout() {
  //   this.whenLogout.emit();
  // }

  handleLogout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']))
      .catch(error => console.log("Couldn't log out"));
  }

  handleGoHome() {
    this.router.navigate(['/']);
  }

  handleGoTrips() {
    this.router.navigate(['/trips'])
  }

}
