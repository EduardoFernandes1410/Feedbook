import { Evaluation, EvaluationData } from './../../models/subject';
import { SubjectList, SubjectItem } from '../../models/feed';
import { UserData } from '../../models/auth';

export interface SubjectState {
  evaluations: EvaluationData[];
  isLoading: boolean;
  error: any;
}

export const subjectEmptyState: SubjectState = {
  evaluations: null,
  isLoading: false,
  error: null,
};
