import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducers } from './stores/reducers';
import { effects } from './stores/effects';
import { EffectsModule } from '@ngrx/effects';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { ConfigComponent } from './pages/config/config.component';
import { FbNavBarComponent } from './components/fb-nav-bar/fb-nav-bar.component';
import { RatingComponent } from './pages/rating/rating.component';
import { MiniCourseCardComponent } from './components/mini-course-card/mini-course-card.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { auth: ['loggedUser'] },
      { feed: ['subjectList'] },
    ],
    rehydrate: true,
  })(reducer);
}
// tslint:disable-next-line: prefer-array-literal
const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FeedComponent,
    CourseCardComponent,
    ConfigComponent,
    FbNavBarComponent,
    RatingComponent,
    MiniCourseCardComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
