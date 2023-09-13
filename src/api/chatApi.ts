import { END_POINTS_URL } from '../common/apiConst';
import { httpTransport } from '../utils/HTTPTransport';
import {
  TGetChatUsers,
  TDeleteChatUsers,
  TDeleteChatByIdData,
  TAddUsersToChatByIdsData,
} from './types';

const headers = {
  'Content-type': 'application/json; charset=UTF-8',
  withCredentials: true,
};

export type TChatApi = typeof chatApi;

export const chatApi = {
  getChats(): Promise<XMLHttpRequest> {
    return httpTransport.get(END_POINTS_URL.CHATS, {
      headers,
    });
  },
  createNewChatByTitle(data: { title: string }) {
    return httpTransport.post(END_POINTS_URL.CHATS, {
      headers,
      data,
    });
  },
  uploadChatAvatar(data: FormData) {
    return httpTransport.put(END_POINTS_URL.AVATAR, {
      data,
    });
  },
  deleteChatById(data: TDeleteChatByIdData) {
    return httpTransport.delete(END_POINTS_URL.CHATS, {
      headers,
      data,
    });
  },
  addUsersToChatByIds(data: TAddUsersToChatByIdsData) {
    return httpTransport.put(END_POINTS_URL.USERS, {
      headers,
      data,
    });
  },
  getChatUsers(data: TGetChatUsers) {
    const { id } = data;
    return httpTransport.get(`${END_POINTS_URL.CHATS}/${id}/users`, {
      headers,
      data,
    });
  },
  deleteChatUsersByIds(data: TDeleteChatUsers) {
    return httpTransport.delete(END_POINTS_URL.USERS, {
      headers,
      data,
    });
  },
  getChatToken(chatId: number): Promise<XMLHttpRequest> {
    return httpTransport.post(`${END_POINTS_URL.GET_CHAT_TOKEN}/${chatId}`, {
      headers,
      id: chatId,
    });
  },
};
