import { SubjectEffects } from './subject/subject.effects';
import { FeedEffects } from './feed/feed.effects';
import { AuthEffects } from './auth/auth.effects';

export const effects = [
  AuthEffects,
  FeedEffects,
  SubjectEffects,
];
