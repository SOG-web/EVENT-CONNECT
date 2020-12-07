import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private authService: AuthService,
    private route: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: prefer-const
    this.firstName = new FormControl(this.authService.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]);
    // tslint:disable-next-line: prefer-const
    this.lastName = new FormControl(
      this.authService.currentUser.lastName,
      Validators.required
    );
    this.profileForm = new FormGroup({
      // tslint:disable-next-line: object-literal-shorthand
      firstName: this.firstName,
      // tslint:disable-next-line: object-literal-shorthand
      lastName: this.lastName,
    });
  }

  // tslint:disable-next-line: typedef
  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService
        .updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved');
        });
    }
  }

  // tslint:disable-next-line: typedef
  validateFirstName() {
    return this.lastName.valid || this.lastName.untouched;
  }
  // tslint:disable-next-line: typedef
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.route.navigate(['events']);
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.authService.logout().subscribe(() => {
      this.route.navigate(['user/login']);
    });
  }
}
