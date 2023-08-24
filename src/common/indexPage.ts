import {
  renderChatPage,
  renderLoginPage,
  renderUserProfile,
  renderRegisterPage,
  renderError404Page,
  renderError5XXPage,
} from '../utils/helpers';

export const links = [
  {
    href: 'pages/login/login.html',
    class: 'font_20',
    linkText: 'Login page',
    onClick: renderLoginPage,
  },
  {
    href: '',
    class: 'font_20',
    linkText: 'Registration page',
    onClick: renderRegisterPage,
  },
  {
    href: '',
    class: 'font_20',
    linkText: 'Chat page',
    onClick: renderChatPage,
  },
  {
    href: '',
    class: 'font_20',
    linkText: 'User profile page',
    onClick: renderUserProfile,
  },
  {
    href: '',
    class: 'font_20',
    linkText: '5XX page',
    onClick: renderError5XXPage,
  },
  {
    href: '',
    class: 'font_20',
    linkText: '404 page',
    onClick: renderError404Page,
  },
  // {
  //   href: 'pages/uiLib/uiLib.html',
  //   class: 'font_20',
  //   linkText: 'UI Lib page',
  // },
];
