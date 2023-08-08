import { links } from './indexPage';
import { chatPage } from './chatPage';
import { uiLibPage } from './uiLibPage';
import { userProfilePage } from './userProfilePage';
import { loginPageInputBlockData } from './loginPage';
import { registrationInputsBlockData } from './registrationPage';

export const context = {
  indexPage: {
    links,
  },
  links: {
    cuteCat: 'user-profile_avatar-image',
  },
  inputAccept: {
    image: 'image/*',
  },
  fieldsName: {
    email: 'email',
    firstName: 'first_name',
    secondName: 'secondName',
    displayName: 'display_name',
    phone: 'phone',
    password: 'password',
  },
  chatPage,
  uiLibPage,
  userProfilePage,
  loginPageInputBlockData,
  registrationInputsBlockData,
};
