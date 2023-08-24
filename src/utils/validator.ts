import { REGEXP } from '../common/regexp';

export type InputType = 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | 'message' | '';

type TValidate = (value: string, inputName: InputType) => string | null

const nameValidator = (name: string): string | null => {
  if (!name.trim()) {
    return 'Поле не должно быть пустым.';
  }
  if (!REGEXP.latinOrCyrillic.test(name)) {
    return 'Допускается использовать только Русские или Английские буквы';
  }
  if (!REGEXP.startWithCapitalizeLetter.test(name)) {
    return 'Первая буква должна быть заглавной';
  }
  if (!REGEXP.noSpaceSymbols.test(name)) {
    return 'Нельзя использовать пробелы';
  }
  if (!REGEXP.noDigitSymbols.test(name)) {
    return 'Нельзя использовать цифры';
  }
  if (!REGEXP.namesValidation.test(name)) {
    return 'Нельзя использовать спец символы, допустим только дефис(-)';
  }
  return null;
};

const loginValidator = (login: string): string | null => {
  if (!login.trim()) {
    return 'Поле не должно быть пустым.';
  }
  if (login.length < 3 || login.length > 20) {
    return 'Длинна от 3 до 20 символов';
  }
  if (!REGEXP.digitsAndLetters.test(login)) {
    return 'Может содержать цифры, но не состоять из них';
  }
  if (!REGEXP.latinLetters.test(login)) {
    return 'Допустима только латиница';
  }
  if (!REGEXP.noSpecialSymbols.test(login)) {
    return 'Нельзя использовать спец символы и пробелы, допустимы дефис и нижнее подчёркивание(- _)';
  }
  return null;
}

const emailValidator = (email: string): string | null => {
  if (!email.trim()) {
    return 'Поле не должно быть пустым.';
  }
  if (!REGEXP.emailValidation.test(email)) {
    return `Ошибка заполнения, допустима только латиница, обязательно должна быть «собака» (@)
     и точка после неё, но перед точкой обязательно должны быть буквы`;
  }
  if (!REGEXP.emailValidation.test(email)) {
    return 'Допустима только латиница';
  }
  return null;
}

const passwordValidator = (password: string): string | null => {
  if (password.length < 8 || password.length > 40) {
    return 'От 8 до 40 символов.';
  }
  if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
    return 'Требуется хотя бы одна заглавная буква и цифра.';
  }
  return null;
}

const phoneValidator = (phone: string): string | null => {
  if (phone.length < 10 || phone.length > 15) {
    return 'От 10 до 15 символов.';
  }
  if (!REGEXP.phoneValidation.test(phone)) {
    return 'Можно использовать только цифры и плюс в начале номера';
  }
  return null;
}

const messageValidator = (message: string): string | null => {
  if (!message.trim()) {
    return 'Сообщение не должно быть пустым.';
  }
  return null;
}

export const validate: TValidate = (value, inputName) => {
  switch (inputName) {
    case 'first_name':
    case 'second_name':
      return nameValidator(value);
    case 'login':
      return loginValidator(value);
    case 'email':
      return emailValidator(value);
    case 'password':
    case 'rep_password':
    case 'oldPassword':
    case 'newPassword':
    case 'repeatNewPassword':
      return passwordValidator(value);
    case 'phone':
      return phoneValidator(value);
    case 'message':
      return messageValidator(value);
  }
  return null;
}
