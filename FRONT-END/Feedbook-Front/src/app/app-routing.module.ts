import { AuthGuard } from './guards/auth/auth.guard';
import { LoggedGuard } from './guards/logged/logged.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ConfigComponent } from './pages/config/config.component';
import { RatingComponent } from './pages/rating/rating.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedGuard] },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'rating', component: RatingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
