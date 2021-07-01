import { SubjectList } from './../../models/feed';
import { createAction, union, props } from '@ngrx/store';
import { type } from 'src/app/utils/functions';

export const feedActionTypes = {
  subjectListRequested: type('[Feed] -Feed subject list requested-'),
  subjectListCompleted: type('[Feed] -Feed subject list completed-'),
  feedError: type('[Feed] -Feed error-'),
};

export const subjectListRequested = createAction(feedActionTypes.subjectListRequested, props<{ orderBy: string }>());
export const subjectListCompleted = createAction(feedActionTypes.subjectListCompleted, props<{ subjectList: SubjectList }>());
export const feedError = createAction(feedActionTypes.feedError, props<{ error: any }>());

const all = union({
  subjectListRequested,
  subjectListCompleted,
  feedError,
});

export type FeedActionsTypes = typeof all;
