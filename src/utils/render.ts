import { Error5XX } from '../pages/5XX';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { Chat } from '../pages/chat';
import { Error404 } from '../pages/404';
import { UserProfile } from '../pages/userProfile';
import { Registration } from '../pages/registration';

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
