import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Converte o que o usuário digitou em número, aceitando o formato brasileiro.
 *   "2,20" -> 2.2 | "1.234,56" -> 1234.56 | "R$ 10" -> 10 | "2.5" -> 2.5
 * Retorna null quando está vazio ou não é um número.
 */
export function paraNumero(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === '') return null;
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : null;

  let texto = String(valor).replace(/R\$/gi, '').replace(/\s/g, '');
  if (texto === '') return null;

  // com vírgula, ela é o separador decimal e os pontos são de milhar
  if (texto.includes(',')) {
    texto = texto.replace(/\./g, '').replace(',', '.');
  }

  const numero = Number(texto);
  return Number.isFinite(numero) ? numero : null;
}

/** Campo preenchido precisa ser um número válido (aceita vírgula). */
export function numeroValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor === null || valor === undefined || valor === '') return null;
    return paraNumero(valor) === null ? { numero: true } : null;
  };
}

/** Campo preenchido precisa ser um número maior que zero (aceita vírgula). */
export function numeroPositivo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor === null || valor === undefined || valor === '') return null;
    const numero = paraNumero(valor);
    if (numero === null) return { numero: true };
    return numero > 0 ? null : { positivo: true };
  };
}
