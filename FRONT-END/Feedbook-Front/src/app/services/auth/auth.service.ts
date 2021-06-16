import { AuthEndpoints } from './auth.endpoints';
import { interceptorSkipHeader } from './../../models/consts/interceptor-skip-header';
import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials, User, UserToRegister } from 'src/app/models/auth';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/reducers';
import { getLoggedUser } from 'src/app/stores/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  public async login(userData: Credentials): Promise<User> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    const res = await this.httpClient.post<User>(AuthEndpoints.login(), userData, { headers }).toPromise();
    return res;
  }

  public async user(studentId: number = null): Promise<any> {
    if (!studentId) { studentId = (await this.store.select(getLoggedUser).pipe(first()).toPromise()).student.id; }
    const endpoint = AuthEndpoints.user(studentId);
    const res = await this.httpClient.get<any>(endpoint, { }).pipe(first()).toPromise();
    return res;
  }
  public async register(userData: UserToRegister): Promise<User> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    const res = await this.httpClient.post<User>(AuthEndpoints.register(), userData, { headers }).toPromise();
    return res;
  }

  public async forgotPassword(email: string): Promise<any> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    const res = await this.httpClient.patch<any>(AuthEndpoints.forgotPassword(), { email }, { headers }).toPromise();
    return res;
  }

  public async logout(): Promise<void> {
    this.ngZone.run(() => {
      this.ngZone.runOutsideAngular(() => {
        localStorage.clear();
        this.router.navigate(['login']);
      });
    });

  }

}
