import { Evaluation } from './../../models/subject';
import { SubjectEndpoints } from './subject.endpoints';
import { SubjectItem, SubjectList } from '../../models/feed';
import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/reducers';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  public async evaluate(userId: number, subjectId: number, evaluation: Evaluation, token: string): Promise<SubjectList> {
    const endpoint = SubjectEndpoints.evaluate();
    const res = await this.httpClient.post<SubjectList>(endpoint, { userId, subjectId, evaluation, token }).pipe(first()).toPromise();
    return res;
  }

}
