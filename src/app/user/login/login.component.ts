import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from 'src/app/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName;
  password;
  mouseoverLogin: boolean;
  loginInvalid = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit(): void {}

  // This following comment were made because of server error but the code are correct
  // tslint:disable-next-line: typedef
  login(formValue) {
    this.authService
      .loginUser(formValue.userName, formValue.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
          this.toastr.error('Invalid account details');
          console.log(resp, formValue);
        } else {
          this.route.navigate(['events']);
        }
      });
  }

  // // tslint:disable-next-line: typedef
  // login(formValues) {
  //   this.authService.loginUser(formValues.userName, formValues.password);
  //   this.route.navigate(['events']);
  // }

  // tslint:disable-next-line: typedef
  cancel() {
    this.route.navigate(['events']);
  }
}
