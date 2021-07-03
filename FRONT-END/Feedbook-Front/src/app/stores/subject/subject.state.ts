import { SubjectList, SubjectItem } from '../../models/feed';
import { UserData } from '../../models/auth';

export interface SubjectState {
  isLoading: boolean;
  error: any;
}

export const subjectEmptyState: SubjectState = {
  isLoading: false,
  error: null,
};
