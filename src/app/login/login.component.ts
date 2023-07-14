import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare let window: any;
import Web3 from 'web3';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})


export class LoginComponent {
  email: any
  password: any

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) { }

  loginUser() {
    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // Save token in local storage
        this.router.navigate(['dashboard']); // Navigate to dashboard
      },
      (error) => {
        console.log('loginUser user')
      }
    );
  }

  async loginWithMetamask() {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the first account
      const account = accounts[0];


      // Send a request to the backend to create a challenge for this account
      this.http.post('http://localhost:8080/api/challenge', { ethereum_address: account }).subscribe({
        next: async (response: any) => {
          const nonceString = response.nonce.toString();
          console.log(`Received nonce: ${nonceString}`);  // Add this log statement here

          const message = `\x19Ethereum Signed Message:\n${nonceString.length}${nonceString}`;



          console.log(`Signing message: ${message}`); // Add this log here



          // Sign the challenge with the user's private key
          const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, account],
          });

          console.log(`Signature: ${signature}`); // Add this log here


          // Send the signature to the backend to verify and log in
          this.http.post('http://localhost:8080/api/login-metamask', { ethereum_address: account, signature }).subscribe({
            next: (response: any) => {
              console.log('Logged in:', response);

              localStorage.setItem('token', response.token);
              // Assuming you are using Angular routing and you have a route for '/dashboard'
              this.router.navigate(['/dashboard']);

            },

            error: (err) => console.error('Failed to create challenge:', err)
          });
        },
        error: (err) => console.error('Failed to create challenge:', err)
      });
    } catch (error) {
      console.error('Failed to connect Metamask:', error);
    }
  }


}
