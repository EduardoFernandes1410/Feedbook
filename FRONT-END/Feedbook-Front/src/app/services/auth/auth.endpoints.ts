import { environment } from '../../../environments/environment';

export class AuthEndpoints {

  public static base(): string {
    return `${environment.url}/student`;
  }

  public static login(): string {
    return `${this.base()}/login`;
  }

  public static user(studentId: number): string {
    return `${this.base()}/${studentId}`;
  }

  public static register(): string {
    return `${this.base()}`;
  }

  public static forgotPassword(): string {
    return `${this.base()}/forgot-password`;
  }

}
