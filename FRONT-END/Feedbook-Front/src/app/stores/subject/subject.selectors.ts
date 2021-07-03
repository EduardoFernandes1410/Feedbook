import { SubjectState } from './subject.state';
import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const mapSubjectState = (state: AppState) => state.subject;

export const mapError = (state: SubjectState) => state.error;
export const getAuthError = createSelector(mapSubjectState, mapError);

export const mapIsLoading = (state: SubjectState) => state.isLoading;
export const getAuthIsLoading = createSelector(mapSubjectState, mapIsLoading);
