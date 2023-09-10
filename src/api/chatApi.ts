import {
  TAddUsersToChatByIdsData,
  TDeleteChatByIdData,
  TDeleteChatUsers,
  TGetChatUsers,
} from './types';
import { END_POINTS_URL } from '../common/apiConst';
import { httpTransport } from '../utils/HTTPTransport';

export type TChatApi = typeof chatApi;

export const chatApi = {
  getChats(): Promise<XMLHttpRequest> {
    return httpTransport.get(END_POINTS_URL.CHATS, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
    });
  },
  createNewChatByTitle(data: { title: string }) {
    return httpTransport.post(END_POINTS_URL.CHATS, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  deleteChatById(data: TDeleteChatByIdData) {
    return httpTransport.delete(END_POINTS_URL.CHATS, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  addUsersToChatByIds(data: TAddUsersToChatByIdsData) {
    return httpTransport.put(END_POINTS_URL.USERS, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  // `${END_POINTS_URL.CHATS}/${id}/users?offset=${offset}&limit=${limit}&name=${name}&email=${email}`,
  getChatUsers(data: TGetChatUsers) {
    const { id } = data;
    return httpTransport.get(`${END_POINTS_URL.CHATS}/${id}/users`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  deleteChatUsersByIds(data: TDeleteChatUsers) {
    return httpTransport.delete(END_POINTS_URL.USERS, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  getChatToken(chatId: number): Promise<XMLHttpRequest> {
    return httpTransport.post(`${END_POINTS_URL.CHATS}${chatId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      id: chatId,
    });
  },
};
