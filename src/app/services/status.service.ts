import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public addPlace: boolean;
  private addPlaceChange: Subject<any> = new Subject();

  addPlaceChange$: Observable<any> = this.addPlaceChange.asObservable();

  constructor() { }

  private setAddPlace(bool: boolean) {
    this.addPlace = bool;
    this.addPlaceChange.next(bool);
    return bool;
  }

  hideAddPlace() {
    this.setAddPlace(false);
  }

  showAddPlace() {
    this.setAddPlace(true);
  }

}
