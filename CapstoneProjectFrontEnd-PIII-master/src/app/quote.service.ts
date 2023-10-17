// quote.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private baseUrl = 'http://localhost:8080/api'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) {}

  storeQuote(quoteData: any) {
    return this.http.post(`${this.baseUrl}/selectpage`, quoteData);
  }
}
