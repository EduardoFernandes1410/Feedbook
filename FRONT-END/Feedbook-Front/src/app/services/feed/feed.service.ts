import { SubjectList } from './../../models/feed';
import { UserData, RegisterData } from '../../models/auth';
import { FeedEndpoints } from './feed.endpoints';
import { interceptorSkipHeader } from '../../models/consts/interceptor-skip-header';
import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/auth';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/reducers';
import { getLoggedUser } from 'src/app/stores/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class FeedService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  public async subjectList(orderBy: string): Promise<SubjectList> {
    const params = new HttpParams({
      fromObject: { orderBy } as any,
    });
    const endpoint = FeedEndpoints.base();
    const res = await this.httpClient.get<SubjectList>(endpoint, { params }).pipe(first()).toPromise();
    return res;
  }

}
