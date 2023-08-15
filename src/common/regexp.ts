const REGEXP = {
  namesValidation: /^([A-ZА-Я][a-zа-я]*)(-[A-ZА-Я][a-zа-я]*)?$/,
  loginValidation: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
  emailValidation: /^[A-Za-z0-9._-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
  passwordValidation: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  phoneValidation: /^\+?\d{10,15}$/,
  messageValidation: /^.+$/,
};
