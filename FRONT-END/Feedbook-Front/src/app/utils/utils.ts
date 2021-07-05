import { AbstractControl } from '@angular/forms';

export class Utils {

  /**
   *  This method is used to repĺace all '_' to '-' in names key of params url
   *  @param {any} params - The parameter to be replace all '_' ocurrences to '-'
   * */
  public static standardizePropFilter(params: any): any {
    const paramsResult = {};
    for (const key in params) {
      if (params[key]) {
        paramsResult[key.replace(new RegExp(/_/, 'g'), '-')] = params[key];
      }
    }
    return paramsResult;
  }

  /**
   * This method is used to transform date Date to string time on format HH:mm
   * @param {Date} date - The data object to be converted to string HH:mm
   * */
  public static dateToTime(date: Date): string {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    return `${hours}:${minutes}`;
  }

  /**
   * This method is used to transform date Date to string on format dd/mm/aaaa
   * @param {Date} date - The date object to be converted to string dd/mm/aaaa
   * */
  public static dateToString(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  /** This method is used to transform string aaaa-mm-dd to object Date */
  public static transformStringToDate(date: string): Date {
    const dateSplit = date.split('-').map((value, idx) => Number(value) - (idx % 2));
    return new Date(dateSplit[0], dateSplit[1], dateSplit[2]);
  }

  /**
   * This method is used to transform string aaaa-mm-dd to dd/mm/aaaa
   * @param {string} date - The stringDate to be formatted.
   * */
  public static formatDate(date: string): string {
    return date.split('-').reverse().join('/');
  }

  /**
   * This method is used to converte a time stamp to a Date object.
   * @param {number} timeStamp - The timestamp to be converted.
   * */
  public static convertTimestampToDate(timeStamp: number): Date {
    return new Date(timeStamp * 1000);
  }

  /**
   * This method is used to validate a formGroup that have 'confirmPassword' and 'password' formControls.
   * @param {AbstractControl} group - The group that have 'confirmPassword' and 'password' formControls.
   * */
  public static arePasswordEquals(group: AbstractControl) {
    const password = group.get('password');
    const confirm = group.get('confirmPassword');
    if (!password.value || !confirm.value) {
      return null;
    }
    if (password.value !== confirm.value) {
      const error = { passwordNotEqual: true };
      password.setErrors(error);
      confirm.setErrors(error);
      return error;
    }
    password.setErrors(null);
    confirm.setErrors(null);
    return null;
  }

}
