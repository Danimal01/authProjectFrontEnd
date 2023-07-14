import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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

}
