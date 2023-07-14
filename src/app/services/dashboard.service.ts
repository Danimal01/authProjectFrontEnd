import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor() { }

  getUserEmail(): string | null {
    return localStorage.getItem('email'); // Retrieve email from local storage
  }

}
