import { SubjectEffects } from './../../stores/subject/subject.effects';
import { first } from 'rxjs/operators';
import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { UserData } from './../../models/auth';
import { Observable } from 'rxjs';
import { FeedEffects } from './../../stores/feed/feed.effects';
import { getSubjectList } from './../../stores/feed/feed.selectors';
import { AppState } from 'src/app/stores/reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { getSubjectRequested, subjectListRequested } from 'src/app/stores/feed/feed.actions';
import { SubjectList } from 'src/app/models/feed';
import { evaluationsRequested } from 'src/app/stores/subject/subject.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public orderBy: string = 'meanGeneral';
  public visible: boolean = false;
  public subjectList$: Observable<SubjectList>;
  public loggedUser: UserData;
  public subjectId: number;

  constructor(
    private store: Store<AppState>,
    private feedEffects: FeedEffects,
    private subjectEffects: SubjectEffects,
  ) {}

  public searchSubject(text: string){
    this.store.dispatch(getSubjectRequested({ query: text, token: this.loggedUser.token, userId : this.loggedUser.user.id }));
  }

  public getSubjectList(){
    this.store.dispatch(subjectListRequested({ orderBy: this.orderBy, token: this.loggedUser.token , userId: this.loggedUser.user.id}));
  }

  public seeEvaluations(value: number){
    console.log(value);
    this.subjectId = value;
    this.visible = true;
    this.subjectEffects.evaluationVoteCompleted$.subscribe(() => {
      this.store.dispatch(evaluationsRequested({ userId: this.loggedUser.user.id, subjectId: this.subjectId, token: this.loggedUser.token }));
    });
  }

  public closedEvaluations(value: boolean) {
    console.log('close');
    this.visible = false;
  }

  async ngOnInit() {
    this.subjectList$ = this.store.select(getSubjectList);
    this.loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();
    this.store.dispatch(subjectListRequested({ orderBy: this.orderBy, token: this.loggedUser.token,  userId: this.loggedUser.user.id}));
    this.feedEffects.subjectListCompleted$.subscribe((data) => {
      console.log(data);
    });
    this.subjectEffects.evaluationVoteCompleted$.subscribe(() => {
      this.store.dispatch(evaluationsRequested({ userId: this.loggedUser.user.id, subjectId: this.subjectId, token: this.loggedUser.token }));
    });
  }
}
