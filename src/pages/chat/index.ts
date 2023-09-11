import Block, { TBlock } from '../../utils/block';
import template from './chat.hbs';
import store from '../../utils/store';
import router from '../../utils/router';
import image from '../../img/messageImage.jpg';
import { APP_PATH } from '../../common/appPath';
import { withStore } from '../../utils/withStore';
import { TChat, TUserData } from '../../api/types';
import { Wrapper } from '../../components/wrapper';
import authController from '../../controllers/auth';
import chatController from '../../controllers/chat';
import { ChatItem } from '../../components/chatItem';
import linkChevron from '../../img/chevronRight.svg';
import { TChatPage } from '../../common/chatPageData';
import { addChatDataInChatPageData } from '../../utils/helpers';

type TChatProps = {
  user: TUserData;
  data: TChatPage;
  chats: TChat[];
  userList: any[];
  selectedChat: number;
  addChatPopupData: any;
  addUserPopupData: any;
  selectedChatTitle: string;
  renderUserProfile: (event: Event) => void;
  messageImage: typeof image;
  linkChevron: typeof linkChevron;
  addUserPopup: (event: Event) => void;
  deleteUserPopup: (event: Event) => void;
  showAddPopup: () => void;
  hideAddPopup: () => void;
  hideAddUserPopup: () => void;
  showAddUserPopup: () => void;
  hideDeleteUserPopup: () => void;
  addNewUser: (userLogin: string) => void;
  deleteUser: (userLogin: string) => void;
  addChat: () => void;
  selectChatByClick: (chatId: number) => void;
  searchInputHandler: (value: string) => void;
  deleteChat: () => void;
  searchUser: (login: string) => void;
};

export class Chat extends Block<TChatProps> {
  constructor(props: TChatProps) {
    if (!props.user.id) {
      authController.getUserData();
    }

    if (!props.chats.length) {
      chatController.getAllChats();
    }

    super({
      ...props,
      selectedChatTitle: props.selectedChatTitle,
      addChatPopupData: props.data.popupData.addChat,
      addUserPopupData: props.data.popupData.addUser,
      selectedChat: props.selectedChat,
      userList: props.userList,
      renderUserProfile: (event: Event) => {
        event.preventDefault();
        this.renderUserProfile();
      },
      addUserPopup: (event: Event) => {
        event.stopPropagation();
        this.showAddUserPopup();
      },
      deleteUserPopup: (event: Event) => {
        event.stopPropagation();
        this.showDeleteUserPopup();
      },
      showAddPopup: () => {
        this.showAddPopup();
      },
      hideAddPopup: () => {
        this.hideAddPopup();
      },
      showAddUserPopup: () => {
        this.showAddUserPopup();
      },
      hideAddUserPopup: () => {
        this.hideAddUserPopup();
      },
      hideDeleteUserPopup: () => {
        this.hideDeleteUserPopup();
      },
      addNewUser: (userLogin: string) => {
        this.addNewUser(userLogin);
      },
      deleteUser: (userLogin: string) => {
        this.deleteUser(userLogin);
      },
      addChat: () => {
        this.addChat();
      },
      deleteChat: () => {
        this.deleteChat();
      },
      selectChatByClick: (chatId: number) => {
        this.selectChatByClick(chatId);
      },
      searchInputHandler: (value: string) => {
        this.searchInputHandler(value);
      },
      messageImage: image,
      linkChevron,
    });
  }

  selectChatByClick(chatId: number) {
    const [selectedChat] = this.props.chats.filter(item => item.id === chatId);
    store.set('selectedChatId', chatId);
    store.set('selectedChatTitle', selectedChat.title);
  }

  deleteChat() {
    const chatId = this.props.selectedChat;
    chatController.deleteChatById({ chatId });
  }

  searchInputHandler(value: string) {
    const chatItem = Object.values(this.refs).filter(
      item => item instanceof ChatItem,
    ) as ChatItem[];
    if (value.length) {
      chatItem.forEach(item => {
        item.show();
        // eslint-disable-next-line
        // @ts-ignore
        if (!item.props.chatName.includes(value)) {
          item.hide();
        }
      });
    } else {
      chatItem.forEach(item => item.show());
    }
  }

  addChat() {
    // eslint-disable-next-line
    const newChatName = window.prompt('Введите название нового чата', '');
    if (newChatName) {
      chatController.createNewChat(newChatName);
    }
  }

  async addNewUser(userLogin: string) {
    const selectedChatId = this.props.selectedChat;
    const result = await authController.searchUser({ login: userLogin });
    if (result) {
      chatController.addUsersToChat({ chatId: selectedChatId, users: [result as number] });
    }
  }

  async deleteUser(userLogin: string) {
    const selectedChatId = this.props.selectedChat;
    const result = await chatController.getChatUsers({
      id: selectedChatId,
      name: '',
      offset: 0,
      limit: 20,
      email: '',
    });
    if (Array.isArray(result)) {
      const userId = result
        .map(item => {
          if (item.login === userLogin) {
            return item.id;
          }
          return 0;
        })
        .filter(id => !!id);
      if (userId.length) {
        chatController.deleteChatUsers({ chatId: selectedChatId, users: userId });
      }
    }
  }

  renderUserProfile() {
    router.go(APP_PATH.USER_PROFILE);
  }

  showAddPopup() {
    (this.refs.addPopupWrapper as Wrapper).show();
  }

  hideAddPopup() {
    (this.refs.addPopupWrapper as Wrapper).hide();
  }

  showAddUserPopup() {
    this.hideAddPopup();
    store.set('isAddUsers', true);
    router.go(APP_PATH.CHAT_USERS);
    // (this.refs.addUserPopupWrapper as Wrapper).show();
  }

  hideAddUserPopup() {
    (this.refs.addUserPopupWrapper as Wrapper).hide();
  }

  showDeleteUserPopup() {
    this.hideAddPopup();
    store.set('isAddUsers', false);
    router.go(APP_PATH.CHAT_USERS);
    // (this.refs.deleteUserUserPopupWrapper as Wrapper).show();
  }

  hideDeleteUserPopup() {
    (this.refs.deleteUserUserPopupWrapper as Wrapper).hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withChatStore = withStore(state => ({
  data: addChatDataInChatPageData(state.chatPageData, state.chats, state?.user?.login || ''),
  user: state.user,
  chats: state.chats,
  userList: state.usersInChat,
  selectedChat: state.selectedChatId,
  selectedChatTitle: state.selectedChatTitle,
}));

const ChatPage = withChatStore(Chat as TBlock);

export default ChatPage;
