import { SubjectItem, SubjectList } from './../../models/feed';
import { createAction, union, props } from '@ngrx/store';
import { type } from 'src/app/utils/functions';

export const feedActionTypes = {
  subjectListRequested: type('[Feed] -Feed subject list requested-'),
  subjectListCompleted: type('[Feed] -Feed subject list completed-'),
  getSubjectRequested: type('[Feed] -Feed get subject requested-'),
  getSubjectCompleted: type('[Feed] -Feed get subject completed-'),
  feedError: type('[Feed] -Feed error-'),
};

export const subjectListRequested = createAction(feedActionTypes.subjectListRequested, props<{ orderBy: string, token: string, userId: number }>());
export const subjectListCompleted = createAction(feedActionTypes.subjectListCompleted, props<{ subjectList: SubjectList }>());
export const getSubjectRequested = createAction(feedActionTypes.getSubjectRequested, props<{ query: string, token: string, userId: number}>());
export const getSubjectCompleted = createAction(feedActionTypes.getSubjectCompleted, props<{ subject: SubjectList }>());
export const feedError = createAction(feedActionTypes.feedError, props<{ error: any }>());

const all = union({
  subjectListRequested,
  subjectListCompleted,
  getSubjectRequested,
  getSubjectCompleted,
  feedError,
});

export type FeedActionsTypes = typeof all;
