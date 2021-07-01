import { UserData, RegisterData } from './../../models/auth';
import { AuthEndpoints } from './auth.endpoints';
import { interceptorSkipHeader } from './../../models/consts/interceptor-skip-header';
import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/auth';
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

  public async login(userData: Credentials): Promise<UserData> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    const res = await this.httpClient.post<UserData>(AuthEndpoints.login(), userData, { headers }).toPromise();
    return res;
  }

  public async register(userData: RegisterData): Promise<UserData> {
    const headers = new HttpHeaders().set(interceptorSkipHeader, '');
    const res = await this.httpClient.post<UserData>(AuthEndpoints.register(), userData, { headers }).toPromise();
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
