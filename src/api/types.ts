export type TSignupRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignInRequestData = Pick<TSignupRequestData, 'login' | 'password'>;

export type TUserData = {
  [key: string]: number | string;
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type TChatUserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
};

export type TUserPassword = {
  oldPassword: string;
  newPassword: string;
};

export type TSearchUserByLoginData = {
  login: string;
};

export type TLastMessage = {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
};

export type TChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: TLastMessage;
};

export type TDeleteChatByIdData = {
  chatId: number;
};

export type TAddUsersToChatByIdsData = {
  users: number[];
  chatId: number;
};

export type TDeleteChatUsers = Pick<TAddUsersToChatByIdsData, 'users' | 'chatId'>;

export type TGetChatUsers = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type TToken = { token: string };

export type TMessage = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: null;
};
