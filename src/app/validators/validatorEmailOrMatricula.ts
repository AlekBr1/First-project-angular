import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailOrMatriculaValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return { required: true };

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isMatricula = /^\d+$/.test(value); // apenas dígitos

  if (isEmail || isMatricula) {
    return null; // válido
  }

  return { emailOrMatricula: true }; // inválido
}
