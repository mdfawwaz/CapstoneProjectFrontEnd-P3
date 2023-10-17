import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http : HttpClient) { }

  saveLocation(location: any): Observable<any> {
    // Convert the location object to a plain JavaScript object
    const plainLocation = {
      address: location.address,
      aptSuite: location.aptSuite,
      city: location.city,
      state: location.state,
      zip: location.zip,
      country: location.country,
      // Add other properties here if needed
    };
  
    // Use JSON.stringify with the plain object
    return this.http.post<any>('http://localhost:8080/api/location', JSON.stringify(plainLocation));
  }
  }
