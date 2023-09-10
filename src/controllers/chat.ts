import { APP_PATH } from '../common/appPath';
import store, { TStore } from '../utils/store';
import router, { TRouter } from '../utils/router';
import { chatApi, TChatApi } from '../api/chatApi';
import {
  TChatUserData,
  TGetChatUsers,
  TDeleteChatByIdData,
  TAddUsersToChatByIdsData,
  TDeleteChatUsers,
} from '../api/types';

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

  getAllChats() {
    this.api
      .getChats()
      .then(response => {
        const chats = response.response;
        const { selectedChat } = this.store.getState();

        if (!selectedChat && chats.length) {
          this.store.set('selectedChat', chats[0].id);
        }

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
        this.getAllChats();
        this.store.set('selectedChat', 0);
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
      errorMessage: error.response.reason,
    };
  }
}

const chatController = new ChatController(chatApi, store, router);

export default chatController;
