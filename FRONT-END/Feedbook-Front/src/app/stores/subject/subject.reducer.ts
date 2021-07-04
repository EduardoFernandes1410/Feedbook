import { createReducer, on, Action } from '@ngrx/store';
import { subjectEmptyState, SubjectState } from './subject.state';
import * as SubjectActions from './subject.actions';

const reducer = createReducer(
  subjectEmptyState,
  on(SubjectActions.evaluateRequested, state => ({ ...state, isLoading: true })),
  on(SubjectActions.evaluateCompleted, (state) => ({ ...state, isLoading: false })),
  on(SubjectActions.evaluationsRequested, state => ({ ...state, isLoading: true })),
  on(SubjectActions.evaluationsCompleted, (state, { evaluations }) => ({ ...state, evaluations, isLoading: false })),
  on(SubjectActions.subjectError, state => ({ ...state, isLoading: false })),
);

export function subjectReducer(state: SubjectState, action: Action) {
  return reducer(state, action);
}
