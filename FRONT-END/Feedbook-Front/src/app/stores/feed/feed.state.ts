import { SubjectList, SubjectItem } from './../../models/feed';
import { UserData } from '../../models/auth';

export interface FeedState {
  subjectList: SubjectList;
  subjectItem: SubjectItem;
  isLoading: boolean;
  error: any;
}

export const feedEmptyState: FeedState = {
  subjectList: null,
  subjectItem: null,
  isLoading: false,
  error: null,
};
