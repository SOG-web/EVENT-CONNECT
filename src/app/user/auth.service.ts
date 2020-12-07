import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from './user.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  currentUser: IUser;

  // This following comment were made because of server error but the code are correct
  // tslint:disable-next-line: typedef
  loginUser(userName: string, password: string) {
    const loginInfo = { username: userName, password };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data) => {
          // tslint:disable-next-line: no-angle-bracket-type-assertion whitespace no-string-literal
          this.currentUser = <IUser>data['user'];
        })
      )
      .pipe(
        catchError((err) => {
          console.log(this.currentUser);
          return of(false);
        })
      );
  }

  // // tslint:disable-next-line: typedef
  // loginUser(userName: string, password: string) {
  //   this.currentUser = {
  //     id: 1,
  //     userName,
  //     firstName: 'John',
  //     lastName: 'Papa',
  //   };
  // }

  // tslint:disable-next-line: typedef
  isAuthenticated() {
    return !!this.currentUser;
  }

  // tslint:disable-next-line: typedef
  checkAuthenticationStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data) => {
          if (data instanceof Object) {
            this.currentUser = data as IUser;
          }
        })
      )
      .subscribe();
  }

  // tslint:disable-next-line: typedef
  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.currentUser = undefined;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/logout', {}, options);
  }
}
