import { SubjectService } from './../../services/subject/subject.service';
import { map, switchMap, catchError, tap, first } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as SubjectActions from './subject.actions';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class SubjectEffects {

  constructor(
    private actions$: Actions<SubjectActions.SubjectActionsTypes>,
    private subjectService: SubjectService,
    private store: Store<AppState>,
    private ngZone: NgZone,
  ) { }

  evaluateRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.subjectActionTypes.evaluateRequested),
      switchMap((action) => {
        return from(this.subjectService.evaluate(action.userId, action.subjectId, action.evaluation, action.token)).pipe(
          map(() => SubjectActions.evaluateCompleted()),
          catchError(error => of(SubjectActions.subjectError({ error }))),
        );
      }),
    ),
  );

  evaluateCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubjectActions.subjectActionTypes.evaluateCompleted),
      ),
    { dispatch: false },
  );

  evaluationsRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.subjectActionTypes.evaluationsRequested),
      switchMap((action) => {
        return from(this.subjectService.evaluations(action.userId, action.subjectId, action.token)).pipe(
          map((evaluations) => SubjectActions.evaluationsCompleted({ evaluations })),
          catchError(error => of(SubjectActions.subjectError({ error }))),
        );
      }),
    ),
  );

  evaluationsCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubjectActions.subjectActionTypes.evaluationsCompleted),
      ),
    { dispatch: false },
  );

  evaluationVoteRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.subjectActionTypes.evaluationVoteRequested),
      switchMap((action) => {
        return from(this.subjectService.evaluationVote(action.userId, action.evaluationId, action.voteType, action.token)).pipe(
          map(() => SubjectActions.evaluationVoteCompleted()),
          catchError(error => of(SubjectActions.subjectError({ error }))),
        );
      }),
    ),
  );

  evaluationVoteCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubjectActions.subjectActionTypes.evaluationVoteCompleted),
      ),
    { dispatch: false },
  );

  subjectError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SubjectActions.subjectActionTypes.subjectError),
      ),
    { dispatch: false },
  );

}
