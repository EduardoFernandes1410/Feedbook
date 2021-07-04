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

  get general_evaluation() { return (this.ratingForm as FormGroup).controls.general_evaluation; }
  get evaluation_content_complexity() { return (this.ratingForm as FormGroup).controls.evaluation_content_complexity; }
  get evaluation_material_quality() { return (this.ratingForm as FormGroup).controls.evaluation_material_quality; }
  get evaluation_professor_evaluation() { return (this.ratingForm as FormGroup).controls.evaluation_professor_evaluation; }
  get evaluation_dedication_time() { return (this.ratingForm as FormGroup).controls.evaluation_dedication_time; }
  get evaluation_desc() { return (this.ratingForm as FormGroup).controls.evaluation_desc; }
  get evaluation_owner() { return (this.ratingForm as FormGroup).controls.evaluation_owner; }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  private initForm(): void {
    this.ratingForm = this.formBuilder.group({
      general_evaluation: [null, [Validators.required]],
      evaluation_content_complexity: [null, [Validators.required]],
      evaluation_material_quality: [null, [Validators.required]],
      evaluation_professor_evaluation: [null, [Validators.required]],
      evaluation_dedication_time: [null, [Validators.required]],
      evaluation_desc: ['', [Validators.required]],
      evaluation_owner: [null, []],
    });
  }

  public async evaluate() {
    if (this.ratingForm.valid) {
      this.loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();

      this.store.dispatch(evaluateRequested({ userId: this.loggedUser.user.id, subjectId: this.subjectId, evaluation: this.ratingForm.value, token: this.loggedUser.token }));
    } else {
      this.ratingForm.markAllAsTouched();
      this.ratingForm.markAsDirty();
    }
  }

  public setOverall(event: any) {
    this.general_evaluation.setValue(Number(event.target.value));
  }

  public setComplexity(event: any) {
    this.evaluation_content_complexity.setValue(Number(event.target.value));
  }

  public setQuality(event: any) {
    this.evaluation_material_quality.setValue(Number(event.target.value));
  }

  public setProfessor(event: any) {
    this.evaluation_professor_evaluation.setValue(Number(event.target.value));
  }

  public async ngOnInit(): Promise<void> {
    this.initForm();
    this.subjectId = this.activatedRoute.snapshot.params.id;
    const subjectList = await this.store.select(getSubjectList).pipe(first()).toPromise();
    this.subject = subjectList.subjects.find(subject => subject.subjectId === this.subjectId);
    console.log(this.subject);
  }

}
