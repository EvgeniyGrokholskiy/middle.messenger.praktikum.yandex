export enum REGISTRATION_PAGE_INPUT_REFS {
  EMAIL_INPUT = 'emailInput',
  LOGIN_INPUT = 'loginInput',
  FIRST_NAME_INPUT = 'firstNameInput',
  SECOND_NAME_INPUT = 'secondNameInput',
  PHONE_INPUT = 'phoneInput',
  PASSWORD_INPUT = 'passwordInput',
  REP_PASSWORD_INPUT = 'repPasswordInput',
}

const registrationPageButtonData = {
  innerText: 'Зарегистрироваться',
  type: 'submit',
  class: 'button-block_login-reg-page',
};

const registrationPageLinkData = {
  href: '',
  linkText: 'Войти',
};

const registrationInputsBlockData = [
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.EMAIL_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'email',
    for: 'email',
    type: 'text',
    placeholder: 'Почта',
    value: 'pochta@yandex.ru',
    errorText: 'Неверный почта',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.LOGIN_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'login',
    for: 'login',
    type: 'text',
    placeholder: 'Логин',
    value: 'ivanivanov',
    errorText: 'Неверный логин',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.FIRST_NAME_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'first_name',
    for: 'first_name',
    type: 'text',
    placeholder: 'Имя',
    value: 'Иван',
    errorText: '',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.SECOND_NAME_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'second_name',
    for: 'second_name',
    type: 'text',
    placeholder: 'Фамилия',
    value: 'Иванов',
    errorText: '',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.PHONE_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'phone',
    for: 'phone',
    type: 'text',
    placeholder: 'Телефон',
    value: '+7 (909) 967 30 30',
    errorText: '',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.PASSWORD_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'password',
    for: 'password',
    type: 'password',
    placeholder: 'Пароль',
    value: '111112',
    errorText: '',
    errorClass: '',
    class: 'form_input font_13',
  },
  {
    ref: REGISTRATION_PAGE_INPUT_REFS.REP_PASSWORD_INPUT,
    regex: '',
    required: true,
    isValue: true,
    error: '',
    name: 'rep_password',
    for: 'rep_password',
    type: 'password',
    placeholder: 'Пароль (ещё раз)',
    value: '123456789',
    errorText: 'Пароли не совпадают',
    errorClass: '',
    class: 'form_input font_13',
  },
];

export const registrationPageData = {
  linkData: registrationPageLinkData,
  inputData: registrationInputsBlockData,
  buttonData: registrationPageButtonData,
};

export type TRegistrationPageData = typeof registrationPageData;
