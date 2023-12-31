import Block from '../../utils/block';
import template from './chatUsers.hbs';
import router from '../../utils/router';
import { APP_PATH } from '../../common/appPath';
import store, { IStore } from '../../utils/store';
import { withStore } from '../../utils/withStore';
import chatController from '../../controllers/chat';
import authController from '../../controllers/auth';
import linkChevron from '../../img/chevronRight.svg';
import { TChat, TChatUserData, TUserData } from '../../api/types';

type TChatUsersProps = {
  user: TUserData;
  chats: TChat[];
  titleText: string;
  buttonText: string;
  isAddUsers: boolean;
  selectedChatId: number;
  selectedChatTitle: string;
  usersInChat: TChatUserData[];
  linkChevron: typeof linkChevron;
  searchUsers: (login: string) => void;
  renderChatPage: (event: Event) => void;
  setUsersInChat: (users: number[]) => void;
};

export class ChatUsers extends Block<TChatUsersProps> {
  constructor(props: TChatUsersProps) {
    if (!props.user.id) {
      authController.getUserData();
      chatController.getAllChats();
    }

    if (props.user.id && !props.chats.length) {
      chatController.getAllChats();
    }

    if (!props.isAddUsers && props.selectedChatId) {
      chatController.getSelectedChatUsers();
    }

    super({
      ...props,
      buttonText: props.isAddUsers ? 'Добавить' : 'Удалить',
      usersInChat: props.usersInChat,
      linkChevron,
      renderChatPage: (event: Event) => {
        event.preventDefault();
        this.renderChatPage();
      },
      searchUsers: (login: string) => {
        this.searchUsers(login);
      },
      setUsersInChat: (users: number[]) => this.setUsersInChat(users),
    });
  }

  async searchUsers(userLogin: string) {
    const result = await authController.searchUser({ login: userLogin });
    store.set('usersInChat', result);
  }

  setUsersInChat(users: number[]) {
    const chatId = this.props.selectedChatId;
    const requestData = { users, chatId };

    if (!users.length) {
      return;
    }

    if (this.props.isAddUsers) {
      chatController.addUsersToChat(requestData);
      store.set('usersInChat', []);
    } else {
      chatController.deleteChatUsers(requestData);
      store.set('usersInChat', []);
      chatController.getChatUsers({ id: chatId });
    }
  }

  renderChatPage() {
    router.go(APP_PATH.MESSENGER);
  }

  protected render(): DocumentFragment {
    const [newSelectedChat] = store
      .getState()
      .chats.filter(c => c.id === store.getState().selectedChatId);
    const titleText = store.getState().isAddUsers
      ? `Добавить пользователей в чат ${store.getState().selectedChatTitle}`
      : `Удалить пользователей из чата ${store.getState().selectedChatTitle}`;
    return this.compile(template, {
      ...this.props,
      titleText,
      selectedChatToRender: [newSelectedChat],
    });
  }
}

const ChatUsersWithStore = withStore((state: IStore) => ({
  ...state,
}));

// eslint-disable-next-line
// @ts-ignore
export const ChatUserPage = ChatUsersWithStore(ChatUsers);
