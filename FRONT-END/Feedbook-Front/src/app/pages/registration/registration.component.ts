import { AppState } from 'src/app/stores/reducers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MustMatch } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;

  get name() { return (this.registerForm as FormGroup).controls.name; }
  get surname() { return (this.registerForm as FormGroup).controls.surname; }
  get email() { return (this.registerForm as FormGroup).controls.email; }
  get password() { return (this.registerForm as FormGroup).controls.password; }
  get passwordConfirmation() { return (this.registerForm as FormGroup).controls.passwordConfirmation; }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  private initForm(): void {
    // tslint:disable-next-line: deprecation
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ufmg)\.br$/)]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'passwordConfirmation'),
    });
  }

  public register() {
    if (this.registerForm.valid) {
      // this.store.dispatch(registerRequested({ user: this.registerForm.value }));
    } else {
      console.log(this.registerForm);
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsDirty();
    }
  }

  public ngOnInit(): void {
    this.initForm();
  }

}
