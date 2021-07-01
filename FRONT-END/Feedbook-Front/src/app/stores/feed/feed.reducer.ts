import { createReducer, on, Action } from '@ngrx/store';
import { feedEmptyState, FeedState } from './feed.state';
import * as FeedActions from './feed.actions';

const reducer = createReducer(
  feedEmptyState,
  on(FeedActions.subjectListRequested, state => ({ ...state, isLoading: true })),
  on(FeedActions.subjectListCompleted, (state, { subjectList }) => ({ ...state, subjectList, isLoading: false })),
  on(FeedActions.feedError, state => ({ ...state, isLoading: false })),
);

export function feedReducer(state: FeedState, action: Action) {
  return reducer(state, action);
}
