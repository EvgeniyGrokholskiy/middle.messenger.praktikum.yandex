export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const BASE_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';
export const WEBSOCKET_URL = 'wss://ya-praktikum.tech/ws/chats/';

export enum END_POINTS_URL {
  // authApi
  SIGN_UP = '/auth/signup',
  SIGN_IN = '/auth/signin',
  AUTH_USER = '/auth/user',
  AUTH_LOGOUT = '/auth/logout',
  // userApi
  GET_USER_BY_ID = '/user/',
  SEARCH_USER = '/user/search',
  CHANGE_USER_PROFILE = '/user/profile',
  CHANGE_USER_PASSWORD = '/user/password',
  CHANGE_USER_PROFILE_AVATAR = '/user/profile/avatar',
  // chatApi
  CHATS = '/chats',
  USERS = '/chats/users',
  GET_CHAT_TOKEN = '/chats/token',
}

export enum WEBSOCKET_STATUSES {
  OPEN = 'open',
  CLOSE = 'close',
  ERROR = 'error',
  MESSAGE = 'message',
}

export enum WEBSOCKET_COMMANDS {
  PING = 'ping',
  GET_OLD_MESSAGES = 'get old',
}
