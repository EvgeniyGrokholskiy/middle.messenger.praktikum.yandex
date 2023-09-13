import { APP_PATH } from '../common/appPath';
import store, { TStore } from '../utils/store';
import router, { TRouter } from '../utils/router';
import { chatApi, TChatApi } from '../api/chatApi';
import {
  TChat,
  TChatUserData,
  TGetChatUsers,
  TDeleteChatUsers,
  TDeleteChatByIdData,
  TAddUsersToChatByIdsData,
} from '../api/types';
import { BASE_RESOURCES_URL } from '../common/apiConst';

type TErrorResponse = {
  isError: boolean;
  errorMessage: string;
};

export class ChatController {
  private readonly api: TChatApi;

  private readonly store: TStore;

  private readonly router: TRouter;

  constructor(api: TChatApi, storeObj: TStore, routerObj: TRouter) {
    this.api = api;
    this.store = storeObj;
    this.router = routerObj;
  }

  addResourcesUrlInAvatars(chat: TChat[], resourcesUrl: string): TChat[] {
    return chat.map(item => ({
      ...item,
      avatar: `${resourcesUrl}${item.avatar}`,
    }));
  }

  getAllChats() {
    this.api
      .getChats()
      .then(response => {
        const chats = this.addResourcesUrlInAvatars(response.response, BASE_RESOURCES_URL);
        this.store.set('chats', chats);
      })
      .catch(error => {
        this.errorHandler(error);
      });
  }

  createNewChat(chatName: string) {
    this.api
      .createNewChatByTitle({ title: chatName })
      .then(response => {
        const result = response.response;
        if (result) {
          this.getAllChats();
        }
      })
      .catch(error => this.errorHandler(error));
  }

  deleteChatById(data: TDeleteChatByIdData) {
    this.api
      .deleteChatById(data)
      .then(() => {
        this.store.set('messages', []);
        this.store.set('selectedChatId', 0);
        this.store.set('selectedChat', null);
        this.getAllChats();
      })
      .catch(error => this.errorHandler(error));
  }

  addUsersToChat(data: TAddUsersToChatByIdsData) {
    this.api
      .addUsersToChatByIds(data)
      .then(response => response)
      .catch(error => this.errorHandler(error));
  }

  getChatUsers(data: TGetChatUsers): Promise<TChatUserData[] | TErrorResponse> {
    return this.api
      .getChatUsers(data)
      .then(response => {
        return response.response as TChatUserData[];
      })
      .catch(error => this.errorHandler(error));
  }

  deleteChatUsers(data: TDeleteChatUsers) {
    return this.api
      .deleteChatUsersByIds(data)
      .then(response => response)
      .catch(error => this.errorHandler(error));
  }

  async getSelectedChatUsers() {
    const { selectedChatId } = this.store.getState();

    if (!selectedChatId) {
      return;
    }

    const usersList = await this.getChatUsers({
      id: selectedChatId,
      email: '',
      limit: 100,
      offset: 0,
      name: '',
    });
    this.store.set('usersInChat', usersList);
  }

  async getChatToken(chatId: number) {
    return this.api
      .getChatToken(chatId)
      .then(response => {
        return response.response;
      })
      .catch(error => this.errorHandler(error));
  }

  setSelectedChatData(chat: TChat) {
    const { id, title, avatar } = chat;

    this.store.set('selectedChatId', id);
    this.store.set('selectedChat', chat);
    this.store.set('selectedChatTitle', title);
    if (avatar) {
      this.store.set('selectedChatAvatar', avatar);
    }
  }

  errorHandler(error: XMLHttpRequest) {
    const { status } = error;
    if (status === 401) {
      this.router.go(APP_PATH.SIGN_IN);
    }
    if (status === 404) {
      this.router.go(APP_PATH.ERROR_404);
    }
    if (status >= 500) {
      this.router.go(APP_PATH.ERROR_5XX);
    }
    return {
      isError: true,
      errorMessage: error.response?.reason,
    };
  }
}

const chatController = new ChatController(chatApi, store, router);

export default chatController;
