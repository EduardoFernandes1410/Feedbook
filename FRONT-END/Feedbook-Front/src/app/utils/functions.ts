import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
const typeCache: { [label: string]: boolean } = {};
/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function formatarCEP(str){
	const re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *
	if(re.test(str)){
		return str.replace(re,"$1.$2-$3");
	}else{
		alert("CEP inválido!");
	}	
	return "";
}

export const numberToMonth = (month: number): string => {
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  const selectedMonth = monthNames[month];
  return selectedMonth;
};

export const cloneObj = (obj: any) => {
  if (!obj) { return null; }
  if (typeof (obj) !== 'object') {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

export const validateCPF = (cpf: string) => {
  if (!cpf) { return true; }

  // tslint:disable-next-line: one-variable-per-declaration
  let numeros, digitos, soma, i, resultado, digitosIguais;
  digitosIguais = 1;
  if (cpf.length < 11) { return false; }
  // tslint:disable-next-line: no-increment-decrement
  for (i = 0; i < cpf.length - 1; i++) {
    // tslint:disable-next-line: triple-equals
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitosIguais = 0;
      break;
    }
  }
  if (!digitosIguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    // tslint:disable-next-line: no-increment-decrement
    for (i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // tslint:disable-next-line: triple-equals
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    numeros = cpf.substring(0, 10);
    soma = 0;
    // tslint:disable-next-line: no-increment-decrement
    for (i = 11; i > 1; i--) {
      soma += numeros.charAt(11 - i) * i;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // tslint:disable-next-line: triple-equals
    if (resultado != digitos.charAt(1)) {
      return false;
    }
    return true;
    // tslint:disable-next-line: no-else-after-return
  } else {
    return false;
  }
};

export const validateCnpj = (cnpj: string) => {

  if (!cnpj) { return true; }

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14)
    return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  // Valida DVs
  let i;
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += (numeros.charAt(tamanho - i) as any as number) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0) as any as number)
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) as any as number * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1) as any as number)
    return false;

  return true;

}

/**
 * @description Extract date string from timestamp in format year-month-day
 */
export const getDateString = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate() + 1 >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const unsubscribeSubscriptions = (subscriptions: Subscription[]): void => {
  for (const sub of subscriptions) {
    sub.unsubscribe();
  }
};

declare var $: any;
export const formatCpfCnpj = (): void => {
  // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: variable-name
  const DocMaskBehavior = function (val) {
    // if (!val) { val = ''; }
    // tslint:disable-next-line: ter-indent
    return val && val.replace(/\D/g, '').length < 12 ? '000.000.000-009' : '00.000.000/0000-00';
  // tslint:disable-next-line: ter-indent
  }, spOptions = {
    // tslint:disable-next-line: object-literal-shorthand
    onKeyPress: function (val, e, field, options) {
      field.mask(DocMaskBehavior.apply({}, arguments), options);
    }, clearIfNotMatch: true,

  };
  $('.cpfcnpj').mask(DocMaskBehavior, spOptions);
};

export const isInvalid = (form: FormGroup, field: string, submitted: boolean) => {
  return form && form.controls && form.controls[field] ? form.controls[field].invalid && submitted : false;
};
