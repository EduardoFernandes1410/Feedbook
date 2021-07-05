import { validateCPF, validateCnpj } from './../utils/functions';
import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line: function-name
export function ValidateCpf(control: AbstractControl) {
  let value = control.value;
  if (!value || value === undefined || value === 'undefined') { return null; }
  value = value.replace(/\./g, '');
  value = value.replace(/\-/g, '');

  if (value.length < 12) {
    if (!validateCPF(value)) {
      return { cpfInvalid: true };
    }
  } else {
    if (!validateCnpj(value)) {
      return { cnpjInvalid: true };
    }
  }
  return null;
}
