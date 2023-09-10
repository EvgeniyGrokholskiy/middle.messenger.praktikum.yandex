import { set } from './helpers';
import { EventBus } from './EventBus';
import { TChat, TUserData } from '../api/types';
import { chatPageData, TChatPage } from '../common/chatPageData';
import { loginPageData, TLoginPageData } from '../common/loginPage';
import { TUserProfilePage, userProfilePageData } from '../common/userProfilePageData';
import { registrationPageData, TRegistrationPageData } from '../common/registrationPage';

export interface IStore {
  registrationPageData: TRegistrationPageData;
  loginPageData: TLoginPageData;
  userProfileData: TUserProfilePage;
  chatPageData: TChatPage;
  user: TUserData;
  chats: TChat[];
  messages: Record<number, any[]>;
  selectedChat: number;
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
  messages: {},
  selectedChat: 0,
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
