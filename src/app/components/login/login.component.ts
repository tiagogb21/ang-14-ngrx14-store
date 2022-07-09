import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  @Input()
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken() !== '') {
      this.router.navigateByUrl('products');
    }
  }

  login() {
    if (this.email == '' || this.password == '') {
      return (this.errorMessage = 'All fields are required!');
    }
    return this.authService.login(this.email, this.password).subscribe(
      () =>
        this.router
          .navigateByUrl('quizzes')
          .then(() => window.location.reload()),
      () => (this.errorMessage = 'All fields are required!')
    );
  }
}
