import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  email: any;
  emailError: string = ''; // Initialize email error message


  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const token = response.token; // if login successful then receive a token  Assuming the token is returned as part of the response
        this.authService.setToken(token); // extracted token is set

        // Redirect to the "/home" page
        this.router.navigate(['/selectpage']);

        alert('You have successfully logged in!');

      },

      (error) => {

        console.error('Login failed:', error);

      }

    );

  }
  register() {
    // Validate the email and show an error message if it's invalid
    if (!this.isEmailValid(this.email)) {
      this.emailError = 'Invalid email format';
      return; // Prevent further processing
    }
    // Your registration logic
  }

  // Function to check email validity
  isEmailValid(email: string): boolean {
    // You can use a regular expression to check for the "@" symbol
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Clear the email error message
  clearEmailError() {
    this.emailError = '';
  }
}

