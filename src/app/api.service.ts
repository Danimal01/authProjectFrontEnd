import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTestEndpoint() {
    return this.http.get('http://localhost:8080/', {responseType: 'text'});
  }
}

//test
