import { getSubjectList } from './../../stores/feed/feed.selectors';
import { AppState } from 'src/app/stores/reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { getSubjectRequested, subjectListRequested } from 'src/app/stores/feed/feed.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public orderBy: string = 'meanGeneral';

  constructor(
    private store: Store<AppState>,
  ) {}

  public searchSubject(text: string){
    this.store.dispatch(getSubjectRequested({ query: text }));
  }

  public getSubjectList(){
    this.store.dispatch(subjectListRequested({ orderBy: this.orderBy }));
  }

  ngOnInit() {
    this.store.dispatch(subjectListRequested({ orderBy: this.orderBy }));
  }
}
