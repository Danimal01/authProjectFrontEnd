import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})


export class RegisterComponent {
  email: any
  password: any

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) { }

    registerUser() {
      this.userService.registerUser(this.email).subscribe(
        (response) => {
          this.router.navigate(['login']); // Navigate to login
        },
        (error) => {
          console.log('registerUser user')
        }
      );
    }


}
