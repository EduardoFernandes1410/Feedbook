import { SubjectItem } from './../../models/feed';
import { first } from 'rxjs/operators';
import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { UserData } from './../../models/auth';
import { AppState } from './../../stores/reducers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { evaluateRequested } from 'src/app/stores/subject/subject.actions';
import { getSubjectList } from 'src/app/stores/feed/feed.selectors';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public ratingForm: FormGroup;
  public loggedUser: UserData;
  public subjectId: number;
  public subject: SubjectItem;

  get generalEvaluation() { return (this.ratingForm as FormGroup).controls.generalEvaluation; }
  get contentComplexity() { return (this.ratingForm as FormGroup).controls.contentComplexity; }
  get materialQuality() { return (this.ratingForm as FormGroup).controls.materialQuality; }
  get professorEvaluation() { return (this.ratingForm as FormGroup).controls.professorEvaluation; }
  get dedicationTime() { return (this.ratingForm as FormGroup).controls.dedicationTime; }
  get desc() { return (this.ratingForm as FormGroup).controls.desc; }
  get owner() { return (this.ratingForm as FormGroup).controls.owner; }
  // get evaluation_owner() { return "augustinho"; }


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  private initForm(): void {
    this.ratingForm = this.formBuilder.group({
      generalEvaluation: [null, [Validators.required]],
      contentComplexity: [null, [Validators.required]],
      materialQuality: [null, [Validators.required]],
      professorEvaluation: [null, [Validators.required]],
      dedicationTime: [null, [Validators.required]],
      desc: ['', [Validators.required]],
      owner: [null, []],
    });
  }


  public async evaluate() {
    if (this.ratingForm.valid) {
      this.loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();
      if(this.owner.value === true ){
        this.owner.setValue('Anônimo')
      }else{
        this.owner.setValue(this.loggedUser.user.name + ' ' + this.loggedUser.user.surname);
      }
      this.store.dispatch(evaluateRequested({ userId: this.loggedUser.user.id, subjectId: this.subjectId, evaluation: this.ratingForm.value, token: this.loggedUser.token }));
    } else {
      this.ratingForm.markAllAsTouched();
      this.ratingForm.markAsDirty();
    }
  }

  public setOverall(event: any) {
    this.generalEvaluation.setValue(Number(event.target.value));
  }

  public setComplexity(event: any) {
    this.contentComplexity.setValue(Number(event.target.value));
  }

  public setQuality(event: any) {
    this.materialQuality.setValue(Number(event.target.value));
  }

  public setProfessor(event: any) {
    this.professorEvaluation.setValue(Number(event.target.value));
  }

  public async ngOnInit(): Promise<void> {
    this.initForm();
    this.subjectId = this.activatedRoute.snapshot.params.id;
    const subjectList = await this.store.select(getSubjectList).pipe(first()).toPromise();
    this.subject = subjectList.subjects.find(subject => subject.subjectId === this.subjectId);
    console.log(this.subject);
  }

}
