import { FeedState } from './feed.state';
import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const mapFeedState = (state: AppState) => state.feed;

export const mapError = (state: FeedState) => state.error;
export const getAuthError = createSelector(mapFeedState, mapError);

export const mapIsLoading = (state: FeedState) => state.isLoading;
export const getAuthIsLoading = createSelector(mapFeedState, mapIsLoading);

export const mapSubjectList = (state: FeedState) => state.subjectList;
export const getSubjectList = createSelector(mapFeedState, mapSubjectList);
