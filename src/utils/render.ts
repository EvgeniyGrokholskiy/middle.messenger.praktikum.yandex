import { Chat } from '../pages/chat/index';
import { Error404 } from '../pages/404/index';
import { Error5XX } from '../pages/5XX/index';
import { HomePage } from '../pages/home/index';
import { LoginPage } from '../pages/login/index';
import { UserProfile } from '../pages/userProfile/index';
import { Registration } from '../pages/registration/index';

const ROUTES = {
  chat: Chat,
  '5xx': Error5XX,
  '4xx': Error404,
  home: HomePage,
  login: LoginPage,
  userProfile: UserProfile,
  registration: Registration,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
