import { SubjectItem, SubjectList } from './../../models/feed';
import { FeedEndpoints } from './feed.endpoints';
import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/reducers';

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
    const endpoint = FeedEndpoints.subjectList();
    const res = await this.httpClient.post<SubjectList>(endpoint, orderBy).pipe(first()).toPromise();
    return res;
  }

  public async getSubject(query: string): Promise<SubjectItem> {
    const endpoint = FeedEndpoints.search();
    const res = await this.httpClient.post<SubjectItem>(endpoint, query).pipe(first()).toPromise();
    return res;
  }

}
