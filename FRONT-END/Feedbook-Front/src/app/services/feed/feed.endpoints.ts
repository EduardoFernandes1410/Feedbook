import { environment } from '../../../environments/environment';

export class FeedEndpoints {

  public static base(): string {
    return `${environment.url}/feed`;
  }

  public static subjectList(): string {
    return `${this.base()}/all`;
  }

  public static search(): string {
    return `${this.base()}/search`;
  }

}
