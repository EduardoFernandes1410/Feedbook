import { FeedService } from './../../services/feed/feed.service';
import { map, switchMap, catchError, tap, first } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as FeedActions from './feed.actions';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class FeedEffects {

  constructor(
    private actions$: Actions<FeedActions.FeedActionsTypes>,
    private router: Router,
    private feedService: FeedService,
    private store: Store<AppState>,
    private ngZone: NgZone,
  ) { }

  subjectListRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.feedActionTypes.subjectListRequested),
      switchMap((action) => {
        return from(this.feedService.subjectList(action.orderBy, action.token, action.userId)).pipe(
          map(list => FeedActions.subjectListCompleted({ subjectList: list })),
          catchError(error => of(FeedActions.feedError({ error }))),
        );
      }),
    ),
  );

  subjectListCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.feedActionTypes.subjectListCompleted),
      ),
    { dispatch: false },
  );

  getSubjectRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.feedActionTypes.getSubjectRequested),
      switchMap((action) => {
        return from(this.feedService.getSubject(action.query, action.token, action.userId)).pipe(
          map(subject => FeedActions.getSubjectCompleted({ subject })),
          catchError(error => of(FeedActions.feedError({ error }))),
        );
      }),
    ),
  );

  getSubjectCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.feedActionTypes.getSubjectCompleted),
      ),
    { dispatch: false },
    
  );

  feedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.feedActionTypes.feedError),
      ),
    { dispatch: false },
  );

}
