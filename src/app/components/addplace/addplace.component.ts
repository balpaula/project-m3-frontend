import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { TripsService } from '../../services/trips.service';
import { PlacesService } from '../../services/places.service';
import axios from 'axios';
import { dependenciesFromGlobalMetadata } from '@angular/compiler/src/render3/r3_factory';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.css'],
})
export class AddplaceComponent implements OnInit {

  CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/travelist/image/upload';
  CLOUDINARY_UPLOAD_PRESET = 'hcwbowtz';

  user: any;
  currentTrip: any;

  name: string;
  description: string;
  photo: any;

  formData: any;

  showForm = false;
  showButton = false;

  constructor( private locationService: LocationService, 
    private tripsService: TripsService, 
    private placesService: PlacesService,
    private authService: AuthService ) { }

  ngOnInit() {
    this.tripsService.currentTripChange$.subscribe((currentTrip) => {
      this.currentTrip = currentTrip;
      this.checkUser();
    });  
    this.user = this.authService.getUser();
  }

  getFiles(event) {
    this.photo = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('file', this.photo);
    this.formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
  }

  submitForm(form) {

    axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.formData
    })
      .then((res) => {
        this.locationService.getPosition()
          .then(coordinates => {
            this.placesService.addPlace({
              name: this.name,
              coordinates: coordinates,
              description: this.description,
              photo: res.data.secure_url
            }, this.currentTrip)
          })
      })
      .catch((error) => {
      
      });
  }

  handleClick() {
    this.showForm = !this.showForm;
  }

  checkUser() {
    if (this.user._id === this.currentTrip.owner._id){
      this.showButton = true;
    }
  }
}
