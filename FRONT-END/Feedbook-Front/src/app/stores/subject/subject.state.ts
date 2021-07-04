import { Evaluation } from './../../models/subject';
import { SubjectList, SubjectItem } from '../../models/feed';
import { UserData } from '../../models/auth';

export interface SubjectState {
  evaluations: Evaluation[];
  isLoading: boolean;
  error: any;
}

export const subjectEmptyState: SubjectState = {
  evaluations: null,
  isLoading: false,
  error: null,
};
