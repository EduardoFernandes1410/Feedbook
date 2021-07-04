import { Evaluation, EvaluationData } from './../../models/subject';
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

  public async evaluations(userId: number, subjectId: number, token: string): Promise<EvaluationData[]> {
    const endpoint = SubjectEndpoints.evaluations();
    const res = await this.httpClient.post<EvaluationData[]>(endpoint, { userId, subjectId, token }).pipe(first()).toPromise();
    return res;
  }

  public async evaluationVote(userId: number, evaluationId: string, voteType: string, token: string): Promise<any> {
    const endpoint = SubjectEndpoints.evaluationVote();
    const res = await this.httpClient.post<any>(endpoint, { userId, evaluationId, type: voteType, token }).pipe(first()).toPromise();
    return res;
  }

}
