import { first } from 'rxjs/operators';
import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { UserData } from './../../models/auth';
import { AppState } from './../../stores/reducers';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectItem } from 'src/app/models/feed';
import { Store } from '@ngrx/store';
import { evaluationsRequested } from 'src/app/stores/subject/subject.actions';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Output() whenSeeEvaluations: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() subject: SubjectItem;
  public loggedUser: UserData;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer
  ) { }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl("http://" + imageUrl);
  }

  public async seeEvaluations(){
    this.loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();
    this.store.dispatch(evaluationsRequested({ userId: this.loggedUser.user.id, subjectId: this.subject.subjectId, token: this.loggedUser.token }));
    this.whenSeeEvaluations.emit(true);
  }

  public goToEvaluation(){
    this.router.navigate([`/rating/${this.subject.subjectId}`]);

  }

  ngOnInit() {
  }


  

}
