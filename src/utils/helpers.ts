import { render } from './render';

export const exitFromUserProfile = () => {
  render('chat');
};

export const renderUserProfile = (event: Event) => {
  event.preventDefault();
  render('userProfile');
};

export const renderRegisterPage = (event: Event) => {
  event.preventDefault();
  render('registration');
};

export const renderLoginPage = (event: Event) => {
  event.preventDefault();
  render('login');
};

export const renderLogin = () => {
  render('login');
};

export const renderChatPage = (event: Event) => {
  event.preventDefault();
  render('chat');
};
export const renderChat = () => {
  render('chat');
};

export const renderError5XXPage = (event: Event) => {
  event.preventDefault();
  render('5xx');
};

export const renderError404Page = (event: Event) => {
  event.preventDefault();
  render('4xx');
};

export const formDataLogger = (data: Record<string, string>) => {
  // Object.entries(data).forEach(dataItem => console.log(dataItem.join(': ')));
  // eslint-disable-next-line
  console.log(data);
};
