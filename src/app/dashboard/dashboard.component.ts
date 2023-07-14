import { Component, OnInit } from '@angular/core'; // <- add OnInit import here
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';  // <-- import Router here
import { HttpClient } from '@angular/common/http';


declare let window: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit { // Implement OnInit interface
  userEmail: string = '';
  address: string | null = null;
  balance: string | null = null;

  constructor(private dashboardService: DashboardService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Use '|| '' to provide a default value of '' if localStorage does not contain 'email'
    this.userEmail = localStorage.getItem('email') || '';
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async connectMetamask() {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // After getting the permission
        // Fetching the Wallet Balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });

        // Update state with address and balance
        this.address = accounts[0];
        this.balance = this.fromWei(balance);

        // The object that we will send to the backend
        const userData = {
          email: this.userEmail,
          ethereum_address: this.address
        };

        // Send a POST request to the backend with the user's email and Ethereum address
        this.http.post('http://localhost:8080/api/connect-metamask', userData).subscribe({
          next: (response) => console.log('Updated user data:', response),
          error: (err) => console.error('Failed to update user data:', err)
        });

      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }


  fromWei(wei: string): string {
    return (parseInt(wei) / 1e18).toString();
  }
}
