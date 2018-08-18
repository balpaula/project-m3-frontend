import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL = environment.API_URL;

  constructor( private httpClient: HttpClient ) { }

  getOne(username): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/profile/${username}`, options)
      .toPromise()
  }

}
