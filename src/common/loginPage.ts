export enum LOGIN_PAGE_INPUT_REFS {
  LOGIN_INPUT = 'loginInput',
  PASSWORD_INPUT = 'passwordInput',
}
export type TLoginPageData = typeof loginPageData;

const loginPageButtonData = {
  innerText: 'Вход',
  type: 'submit',
  class: 'button-block_login-page',
};

const loginPageLinkData = {
  href: '',
  linkText: 'Ещё не зарегистрированы?',
};

const loginPageInputBlockData = [
  {
    ref: LOGIN_PAGE_INPUT_REFS.LOGIN_INPUT,
    regex: '',
    isValue: true,
    disabled: false,
    required: true,
    name: 'login',
    for: 'login',
    type: 'text',
    placeholder: 'Логин',
    value: '',
    errorText: 'Неверный логин',
    class: 'form_input font_13',
  },
  {
    ref: LOGIN_PAGE_INPUT_REFS.PASSWORD_INPUT,
    regex: '',
    isValue: true,
    disabled: false,
    required: true,
    name: 'password',
    for: 'password',
    type: 'password',
    placeholder: 'Пароль',
    value: '',
    errorText: 'Неверный пароль',
    class: 'form_input font_13',
  },
];

export const loginPageData = {
  buttonData: loginPageButtonData,
  linkData: loginPageLinkData,
  inputData: loginPageInputBlockData,
};
