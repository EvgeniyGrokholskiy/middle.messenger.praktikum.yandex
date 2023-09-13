import { httpTransport } from '../utils/HTTPTransport';
import { END_POINTS_URL } from '../common/apiConst';
import { TSignupRequestData, TUserPassword } from './types';

export type TUserApi = typeof userApi;

const headers = {
  'Content-type': 'application/json; charset=UTF-8',
  withCredentials: true,
}

export const userApi = {
  getUserProfileById(userId: number): Promise<XMLHttpRequest> {
    return httpTransport.get(`${END_POINTS_URL.GET_USER_BY_ID}/${userId}`, {
      headers,
      userId,
    });
  },
  changeUserProfileData(data: TSignupRequestData): Promise<XMLHttpRequest> {
    return httpTransport.put(END_POINTS_URL.CHANGE_USER_PROFILE, {
      headers,
      data,
    });
  },
  changeUserPasswordData(data: TUserPassword): Promise<XMLHttpRequest> {
    return httpTransport.put(END_POINTS_URL.CHANGE_USER_PASSWORD, {
      headers,
      data,
    });
  },
  setNewAvatarData(data: FormData): Promise<XMLHttpRequest> {
    return httpTransport.put(END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR, {
      data,
    });
  },
};
