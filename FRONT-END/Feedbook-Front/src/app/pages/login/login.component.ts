import { loginRequested } from './../../stores/auth/auth.actions';
import { AppState } from './../../stores/reducers';
import { AuthEffects } from './../../stores/auth/auth.effects';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  get email() { return (this.loginForm as FormGroup).controls.email; }
  get password() { return (this.loginForm as FormGroup).controls.password; }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private authEffects: AuthEffects,
  ) {}

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ufmg)\.br$/)]],
      password: ['', [Validators.required]],
    });
  }

  public login() {
    if (this.loginForm.valid) {
      this.store.dispatch(loginRequested({ user: this.loginForm.value }));
    } else {
      console.log(this.loginForm);
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
    }
  }

  public ngOnInit(): void {
    this.initForm();
  }

}
