import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public addPlace: boolean;
  private addPlaceChange: Subject<any> = new Subject();
  public createTrip: boolean;
  private createTripChange: Subject<any> = new Subject();
  public star: boolean;
  private starChange: Subject<any> = new Subject();

  addPlaceChange$: Observable<any> = this.addPlaceChange.asObservable();
  createTripChange$: Observable<any> = this.createTripChange.asObservable();
  starChange$: Observable<any> = this.starChange.asObservable();

  constructor() { }

  private setAddPlace(bool: boolean) {
    this.addPlace = bool;
    this.addPlaceChange.next(bool);
    return bool;
  }

  private setCreateTrip(bool: boolean) {
    this.createTrip = bool;
    this.createTripChange.next(bool);
    return bool;
  }

  private setStar(bool: boolean) {
    this.star = bool;
    this.starChange.next(bool);
    return bool;
  }

  hideAddPlace() {
    this.setAddPlace(false);
  }

  showAddPlace() {
    this.setAddPlace(true);
  }

  hideCreateTrip() {
    this.setCreateTrip(false);
  }

  showCreateTrip() {
    this.setCreateTrip(true);
  }

  hideStar() {
    this.setStar(false);
  }

  showStar() {
    this.setStar(true);
  }

}
