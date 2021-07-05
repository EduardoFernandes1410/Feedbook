import { first } from 'rxjs/operators';
import { getLoggedUser } from './../../stores/auth/auth.selectors';
import { UserData } from './../../models/auth';
import { userUpdateRequested } from './../../stores/auth/auth.actions';
import { AppState } from './../../stores/reducers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MustMatch } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  public updateForm: FormGroup;
  public loggedUser: UserData;

  get name() { return (this.updateForm as FormGroup).controls.name; }
  get surname() { return (this.updateForm as FormGroup).controls.surname; }
  get email() { return (this.updateForm as FormGroup).controls.email; }
  get password() { return (this.updateForm as FormGroup).controls.password; }
  get passwordConfirmation() { return (this.updateForm as FormGroup).controls.passwordConfirmation; }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  private async initForm() {
    this.loggedUser = await this.store.select(getLoggedUser).pipe(first()).toPromise();
    // this.updateForm.value.id = this.loggedUser.user.id;
    // this.updateForm.value.name = this.loggedUser.user.name;
    // this.updateForm.value.surname = this.loggedUser.user.surname;
    // this.updateForm.value.email = this.loggedUser.user.email;
    // console.log(this.updateForm.value.id);

    // tslint:disable-next-line: deprecation
    this.updateForm = this.formBuilder.group({
      name: [this.loggedUser.user.name, [Validators.required]],
      surname: [this.loggedUser.user.surname, [Validators.required]],
      email: [this.loggedUser.user.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ufmg)\.br$/)]],
      password: ['' ],
      passwordConfirmation: ['' ],
      id: [this.loggedUser.user.id]
    },
    {
      validator: MustMatch('password', 'passwordConfirmation'),
    });
  }

  public async update() {
    if (this.updateForm.valid) {
      this.store.dispatch(userUpdateRequested({ userData: this.updateForm.value, token: this.loggedUser.token }));
    } else {
      console.log(this.updateForm);
      this.updateForm.markAllAsTouched();
      this.updateForm.markAsDirty();
    }
  }

  async ngOnInit() {
    await this.initForm();

    
  }

}
