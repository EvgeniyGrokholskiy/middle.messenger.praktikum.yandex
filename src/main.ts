import './style.scss';
import 'normalize.css';

import Router from './utils/router';
import ChatPage from './pages/chat';
import { H1 } from './components/h1';
import { Error404 } from './pages/404';
import { Error5XX } from './pages/5XX';
import { Form } from './components/form';
import { Link } from './components/link';
import { LoginPage } from './pages/login';
import { Popup } from './components/popup';
import { APP_PATH } from './common/appPath';
import { Avatar } from './components/avatar';
import { Button } from './components/button';
import { AddFile } from './components/addFile';
import { Wrapper } from './components/wrapper';
import { ChatItem } from './components/chatItem';
import { ChatUserPage } from './pages/chatUsers';
import { MenuItem } from './components/menuItem';
import { Paragraph } from './components/paragraph';
import ErrorMessage from './components/errorMessage';
import { InputBlock } from './components/inputBlock';
import { SendButton } from './components/sendButton';
import { UserProfilePage } from './pages/userProfile';
import { SearchInput } from './components/searchInput';
import { registrationPage } from './pages/registration';
import { InputElement } from './components/inputElement';
import { AddFileButton } from './components/addFileButton';
import { AddUserButton } from './components/addUserButton';
import { InMessageItem } from './components/inMessageItem';
import { OutMessageItem } from './components/outMessageItem';
import { registerComponent } from './utils/resgiterComponent';
import { NewMessageInput } from './components/newMessageInput';
import { NewMessageBlock } from './components/newMessageBlock';
import { UserProfileForm } from './components/userProfileForm';
import { DataSelectBlock } from './components/dataSelectBlock';
import { DeleteChatButton } from './components/deleteChatButton';
import { UserProfileAvatar } from './components/userProfileAvatar';
import { UserOperationPopup } from './components/userOperationPopup';
import { UserProfileInputBlock } from './components/userProfileInputBlock';
import { UnreadMessageIndicator } from './components/unreadMessageIndicator';
import { UsersInChatForm } from './components/usersInChatForm';
import { SearchUsers } from './components/searchUsers';

registerComponent('H1', H1);
registerComponent('Form', Form);
registerComponent('Link', Link);
registerComponent('Popup', Popup);
registerComponent('Button', Button);
registerComponent('Avatar', Avatar);
registerComponent('AddFile', AddFile);
registerComponent('Wrapper', Wrapper);
registerComponent('MenuItem', MenuItem);
registerComponent('ChatItem', ChatItem);
registerComponent('Paragraph', Paragraph);
registerComponent('InputBlock', InputBlock);
registerComponent('SendButton', SendButton);
registerComponent('SearchInput', SearchInput);
registerComponent('SearchUsers', SearchUsers);
// registerComponent('ChatUserPage', ChatUserPage);
registerComponent('InputElement', InputElement);
registerComponent('ErrorMessage', ErrorMessage);
registerComponent('AddFileButton', AddFileButton);
registerComponent('AddUserButton', AddUserButton);
registerComponent('InMessageItem', InMessageItem);
registerComponent('OutMessageItem', OutMessageItem);
registerComponent('DataSelectBlock', DataSelectBlock);
registerComponent('NewMessageBlock', NewMessageBlock);
registerComponent('NewMessageInput', NewMessageInput);
registerComponent('UserProfileForm', UserProfileForm);
registerComponent('UsersInChatForm', UsersInChatForm);
registerComponent('DeleteChatButton', DeleteChatButton);
registerComponent('UserProfileAvatar', UserProfileAvatar);
registerComponent('UserOperationPopup', UserOperationPopup);
registerComponent('UserProfileInputBlock', UserProfileInputBlock);
registerComponent('UnreadMessageIndicator', UnreadMessageIndicator);

window.addEventListener('DOMContentLoaded', () => {
  Router.use(APP_PATH.SIGN_IN, LoginPage)
    .use(APP_PATH.SIGNUP, registrationPage)
    .use(APP_PATH.CHAT, ChatPage)
    .use(APP_PATH.CHAT_USERS, ChatUserPage)
    .use(APP_PATH.USER_PROFILE, UserProfilePage)
    .use(APP_PATH.ERROR_404, Error404)
    .use(APP_PATH.ERROR_5XX, Error5XX)
    .start();
});
