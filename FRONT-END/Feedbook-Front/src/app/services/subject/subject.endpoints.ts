import { environment } from '../../../environments/environment';

export class SubjectEndpoints {

  public static base(): string {
    return `${environment.url}/subject`;
  }

  public static evaluate(): string {
    return `${this.base()}/evaluate`;
  }

}
