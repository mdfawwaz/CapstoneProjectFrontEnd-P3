import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.css']
})
export class SelectPageComponent {
  customerName: string = '';
  accountStatus: string = 'New';
  quoteName: string = '';
  quoteOwner: string = '';
  quoteService: any;
  http: any;
  constructor() {
    // Constructor logic
  }
  onSubmit() {
    const uniqueQuoteId = this.generateUniqueQuoteId();
    const dataToStore = {
        customerName: this.customerName,
        accountStatus: this.accountStatus,
        quoteName: this.quoteName,
        quoteOwner: this.quoteOwner,
        quoteId: uniqueQuoteId
    };

    this.quoteService.storeQuote(dataToStore).subscribe(
        (response: any) => {
            console.log('Quote stored successfully:', response);
        },
        (error: any) => {
            console.error('Error storing quote:', error);
        }
    );
}
generateUniqueQuoteId(): string {
  const timestamp: number = Date.now();
  const randomNumber: number = Math.floor(Math.random() * 10000); // You can adjust the range as needed
  const quoteId: string = `Q${timestamp}-${randomNumber}`;
  return quoteId;
}

 saveData() {
    const data = {
      customerName: this.customerName,
      accountStatus: this.accountStatus,
      quoteName: this.quoteName,
      quoteOwner: this.quoteOwner
    };

    this.http.post('http://localhost:4200/selectpage', data).subscribe(
      (response: any) => {
        console.log('Data saved successfully', response);
      },
      (error: any) => {
        console.error('Failed to save data', error);
        // Handle the error here
      }
    );
  }
}
