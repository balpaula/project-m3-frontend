import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  feedbackEnabled: any;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.authService.signup({
        username: this.username,
        email: this.email,
        password: this.password,
    })
    .then(() => {
        this.router.navigate(['/trips']);
    })
    .catch(error => {
        console.log('Could not sign up');
    });
  }

}
