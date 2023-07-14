import { Component, OnInit } from '@angular/core'; // <- add OnInit import here
import { DashboardService } from '../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit { // Implement OnInit interface
  userEmail: string = ''; // Initialize userEmail with an empty string

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // Use '|| '' to provide a default value of '' if localStorage does not contain 'email'
    this.userEmail = localStorage.getItem('email') || '';
  }

  getWelcomeMessage() {

  }
}
