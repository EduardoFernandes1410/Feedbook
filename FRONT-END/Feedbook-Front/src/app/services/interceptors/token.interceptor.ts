import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, timeout } from 'rxjs/operators';
import { interceptorSkipHeader } from '../../models/consts/interceptor-skip-header';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/reducers';
import { getLoggedUser } from 'src/app/stores/auth/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private defaultTimeout = 60000;

  constructor(
    private store: Store<AppState>,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.has(interceptorSkipHeader)) {
      const headers = request.headers.delete(interceptorSkipHeader);
      return next.handle(request.clone({ headers })).pipe(timeout(this.defaultTimeout));
    }

    return this.getUser()
      .pipe(
        mergeMap((user) => {
          if (user) {
            request = request.clone({
              setHeaders: {
                Authorization: user.token,
              },
            });
          }
          return next.handle(request).pipe(timeout(this.defaultTimeout));
        }),
      );
  }

  private getUser(): Observable<any> {
    return this.store.select(getLoggedUser);
  }

}
