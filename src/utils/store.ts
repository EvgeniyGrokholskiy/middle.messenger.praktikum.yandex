import { set } from './helpers';
import { EventBus } from './EventBus';
import { chatPageData, TChatPage } from '../common/chatPageData';
import { loginPageData, TLoginPageData } from '../common/loginPage';
import { TChat, TChatUserData, TMessage, TUserData } from '../api/types';
import { TUserProfilePage, userProfilePageData } from '../common/userProfilePageData';
import { registrationPageData, TRegistrationPageData } from '../common/registrationPage';

export interface IStore {
  registrationPageData: TRegistrationPageData;
  loginPageData: TLoginPageData;
  userProfileData: TUserProfilePage;
  chatPageData: TChatPage;
  user: TUserData;
  chats: TChat[];
  selectedChat: TChat | null;
  usersInChat: TChatUserData[];
  findUsers: any[];
  messages: TMessage[];
  errorMessage: string;
  selectedChatId: number;
  selectedChatTitle: string;
  selectedChatAvatar: string;
  isAddUsers: boolean;
}
export const nullUser: TUserData = {
  id: 0,
  avatar: '',
  display_name: '',
  email: '',
  first_name: '',
  login: '',
  phone: '',
  second_name: '',
};

const initialState: IStore = {
  registrationPageData,
  loginPageData,
  userProfileData: userProfilePageData,
  chatPageData,
  user: nullUser,
  chats: [],
  selectedChat: null,
  findUsers: [],
  usersInChat: [],
  messages: [],
  selectedChatId: 0,
  selectedChatTitle: '',
  selectedChatAvatar: '',
  errorMessage: '',
  isAddUsers: true,
};

export enum STORE_EVENTS {
  UPDATED = 'updated',
}

export class Store extends EventBus {
  private readonly state: IStore = {} as IStore;

  constructor(state: IStore) {
    super();
    this.state = state;
  }

  public set(keyPath: keyof IStore, data: unknown) {
    set(this.state, keyPath, data);

    this.emit(STORE_EVENTS.UPDATED, this.getState());
  }

  public setSelectedChat(chatId: number) {
    const { chats } = this.getState();
    const [newSelectedChat] = chats.filter(chat => chat.id === chatId);
    this.set('selectedChat', newSelectedChat);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store(initialState);

export type TStore = typeof store;

// eslint-disable-next-line
// @ts-ignore
window.store = store;

export default store;
