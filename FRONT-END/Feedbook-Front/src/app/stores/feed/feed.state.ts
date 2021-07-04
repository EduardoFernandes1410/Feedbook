import { SubjectList, SubjectItem } from './../../models/feed';
import { UserData } from '../../models/auth';

export interface FeedState {
  subjectList: SubjectList;
  isLoading: boolean;
  error: any;
}

export const feedEmptyState: FeedState = {
  subjectList: null,
  isLoading: false,
  error: null,
};
