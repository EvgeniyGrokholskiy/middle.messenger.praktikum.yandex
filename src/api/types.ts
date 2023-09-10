export type TSignupRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignInRequestData = Pick<TSignupRequestData, 'login' | 'password'>;

export type TUserData = {
  [key: string]: number | string;
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type TUserPassword = {
  oldPassword: string;
  newPassword: string;
};
