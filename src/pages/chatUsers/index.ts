import Block from '../../utils/block';
import template from './chatUsers.hbs';
import router from '../../utils/router';
import { TChat } from '../../api/types';
import { APP_PATH } from '../../common/appPath';
import store, { IStore } from '../../utils/store';
import { withStore } from '../../utils/withStore';
import chatController from '../../controllers/chat';
import authController from '../../controllers/auth';
import linkChevron from '../../img/chevronRight.svg';

export class ChatUsers extends Block {
  constructor(props: any) {
    if (!props.user.id) {
      authController.getUserData();
    }

    if (props.user.id && !props.chats.length) {
      chatController.getAllChats();
    }

    if (!props.isAddUsers && props.selectedChatId) {
      chatController.getSelectedChatUsers();
    }

    super({
      ...props,
      titleText: props.isAddUsers
        ? `Добавить пользователей в чат ${props.selectedChatTitle}`
        : `Удалить пользователей из чата ${props.selectedChatTitle}`,
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
    const requestData = { users, chatId: this.props.selectedChatId };

    if (this.props.isAddUsers) {
      chatController.addUsersToChat(requestData);
    } else {
      chatController.deleteChatUsers(requestData);
    }
  }

  renderChatPage() {
    router.go(APP_PATH.CHAT);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const ChatUsersWithStore = withStore((state: IStore) => ({
  ...state,
  selectedChatToRender: getSelectedChatArray(state.selectedChat),
}));

export const ChatUserPage = ChatUsersWithStore(ChatUsers);

const getSelectedChatArray = (selectedChat: TChat | null) => {
  return selectedChat ? [selectedChat] : [];
};
