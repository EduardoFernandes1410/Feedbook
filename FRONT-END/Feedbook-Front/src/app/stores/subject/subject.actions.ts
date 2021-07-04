import { Evaluation } from './../../models/subject';
import { createAction, union, props } from '@ngrx/store';
import { type } from 'src/app/utils/functions';

export const subjectActionTypes = {
  evaluateRequested: type('[Subject] -Subject evaluate requested-'),
  evaluateCompleted: type('[Subject] -Subject evaluate completed-'),
  evaluationsRequested: type('[Subject] -Subject evaluations requested-'),
  evaluationsCompleted: type('[Subject] -Subject evaluations completed-'),
  subjectError: type('[Subject] -Subject error-'),
};

export const evaluateRequested = createAction(subjectActionTypes.evaluateRequested, props<{ userId: number, subjectId: number, evaluation: Evaluation, token: string }>());
export const evaluateCompleted = createAction(subjectActionTypes.evaluateCompleted);
export const evaluationsRequested = createAction(subjectActionTypes.evaluationsRequested, props<{ userId: number, subjectId: number, token: string }>());
export const evaluationsCompleted = createAction(subjectActionTypes.evaluationsCompleted, props<{ evaluations: Evaluation[] }>());
export const subjectError = createAction(subjectActionTypes.subjectError, props<{ error: any }>());

const all = union({
  evaluateRequested,
  evaluateCompleted,
  evaluationsRequested,
  evaluationsCompleted,
  subjectError,
});

export type SubjectActionsTypes = typeof all;
