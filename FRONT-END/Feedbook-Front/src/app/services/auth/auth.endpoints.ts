import { environment } from '../../../environments/environment';

export class AuthEndpoints {

  public static base(): string {
    return `${environment.url}/user`;
  }

  public static login(): string {
    return `${this.base()}/login`;
  }

  public static register(): string {
    return `${this.base()}/register`;
  }

  public static forgotPassword(): string {
    return `${this.base()}/forgot-password`;
  }

}
