import { SubjectList } from './../../models/feed';
import { UserData } from '../../models/auth';

export interface AuthState {
  subjectList: SubjectList;
  isLoading: boolean;
  error: any;
}

export const authEmptyState: AuthState = {
  subjectList: null,
  isLoading: false,
  error: null,
};
