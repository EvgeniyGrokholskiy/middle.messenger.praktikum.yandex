import Block from '../../utils/block';
import template from './userProfile.hbs';
import store from '../../utils/store';
import { withStore } from '../../utils/withStore';
import { Wrapper } from '../../components/wrapper';
import ErrorMessage from '../../components/errorMessage';
import avatarBackground from '../../img/avatarBackground.jpg';
import { UserProfileForm } from '../../components/userProfileForm';
import authController, { TAuthController } from '../../controllers/auth';
import { TSignupRequestData, TUserData, TUserPassword } from '../../api/types';
import { backToChat, getUserProfilePageDataWithValues } from '../../utils/helpers';
import userProfileController, { TUserProfileController } from '../../controllers/userProfile';
import {
  TChangeUserData,
  TUserProfilePage,
  TChangeUserPassword,
} from '../../common/userProfilePageData';

type TUserProfileBlockProps = {
  data: TUserProfilePage;
  user: TUserData;
  fileExtension: readonly string[] | undefined;
  changeUserData: TChangeUserData | undefined;
  changeUserPassword: TChangeUserPassword | undefined;
  exitFromUserProfile: () => void;
  logout: () => void;
  showAddFilePopup: () => void;
  hideAddFilePopup: () => void;
  activateUserDataEditMode: () => void;
  activatePasswordEditMode: () => void;
  disableUserEditMode: () => void;
  disablePasswordEditMode: () => void;
  classToBackgroundImage: string;
  avatarBackground: typeof avatarBackground;
  setNewUserData: (values: Record<string, string>) => void;
  setNewPassword: (values: Record<string, string>) => void;
  setNewAvatar: (data: FormData) => void;
};

class UserProfileBlock extends Block<TUserProfileBlockProps> {
  private readonly authController: TAuthController = authController;

  private readonly userController: TUserProfileController = userProfileController;

  constructor(props: TUserProfileBlockProps) {
    if (!props.user.id) {
      authController.getUserData();
    }

    super({
      ...props,
      avatarBackground,
      classToBackgroundImage: 'avatar-big',
      fileExtension: props.data?.fileExtension,
      changeUserData: props.data?.userProfileChangeLinks?.changeUserData,
      changeUserPassword: props.data?.userProfileChangeLinks?.changeUserPassword,
      exitFromUserProfile: () => {
        backToChat();
      },
      logout: () => {
        this.logout();
      },
      showAddFilePopup: () => {
        this.showAddFilePopup();
      },
      hideAddFilePopup: () => {
        this.hideAddFilePopup();
      },
      activateUserDataEditMode: () => {
        this.activateUserDataEditMode();
      },
      activatePasswordEditMode: () => {
        this.activatePasswordEditMode();
      },
      disableUserEditMode: () => {
        this.disableUserEditMode();
      },
      disablePasswordEditMode: () => {
        this.disablePasswordEditMode();
      },
      setNewUserData: (values: Record<string, string>) => {
        this.setNewUserData(values);
      },
      setNewPassword: (values: Record<string, string>) => {
        this.setNewPassword(values);
      },
      setNewAvatar: (data: FormData) => {
        this.setNewAvatar(data);
      },
    });
  }

  getNewValues(keys: string[], values: Record<string, string>): Record<string, string> {
    const valuesArray = Object.entries(values)
      .map(item => {
        if (keys.includes(item[0])) {
          return item;
        }
        return null;
      })
      .filter(item => !!item) as [string, string][];
    return Object.fromEntries(valuesArray);
  }

  async setNewUserData(values: Record<string, string>) {
    const keys = this.props.data.userProfileInputsNames as string[];
    const newValues = this.getNewValues(keys, values) as TSignupRequestData;

    const result = await this.userController.changeUserProfileData(newValues);
    if (!result.isError) {
      this.disablePasswordEditMode();
      store.set('user', newValues);
    } else {
      (this.refs.userBlockErrorMessage as ErrorMessage).show();
      (this.refs.userBlockErrorMessage as ErrorMessage).setProps({
        errorMessage: result.errorMessage,
      });
      setTimeout(() => {
        (this.refs.userBlockErrorMessage as ErrorMessage).setProps({ errorMessage: '' });
        (this.refs.userBlockErrorMessage as ErrorMessage).hide();
      }, 2000);
    }
  }

  async setNewPassword(values: Record<string, string>) {
    const keys = this.props.data.userProfilePasswordBlockInputNames as string[];
    const newValues = this.getNewValues(keys, values) as TUserPassword;

    const result = await this.userController.changeUserPassword(newValues);
    if (!result.isError) {
      this.disablePasswordEditMode();
    } else {
      (this.refs.passwordBlockErrorMessage as ErrorMessage).show();
      (this.refs.passwordBlockErrorMessage as ErrorMessage).setProps({
        errorMessage: result.errorMessage,
      });
      setTimeout(() => {
        (this.refs.passwordBlockErrorMessage as ErrorMessage).setProps({ errorMessage: '' });
        (this.refs.passwordBlockErrorMessage as ErrorMessage).hide();
      }, 2000);
    }
  }

  activateUserDataEditMode() {
    (this.refs.userProfileSettingBlock as Wrapper).hide();
    (this.refs.userProfileInputBlock as UserProfileForm).enableEditMode();
  }

  activatePasswordEditMode() {
    (this.refs.userProfileSettingBlock as Wrapper).hide();
    (this.refs.userProfileInputBlockForm as Wrapper).hide();
    (this.refs.userProfilePasswordBlockForm as Wrapper).show();
    (this.refs.userProfilePasswordBlock as UserProfileForm).enableEditMode();
  }

  disableUserEditMode() {
    (this.refs.userProfileSettingBlock as Wrapper).show();
  }

  disablePasswordEditMode() {
    (this.refs.userProfileSettingBlock as Wrapper).show();
    (this.refs.userProfileInputBlockForm as Wrapper).show();
    (this.refs.userProfilePasswordBlockForm as Wrapper).hide();
  }

  showAddFilePopup(): void {
    (this.refs.addAvatarWrapper as Wrapper).show();
  }

  hideAddFilePopup(): void {
    (this.refs.addAvatarWrapper as Wrapper).hide();
  }

  async setNewAvatar(data: FormData) {
    const result = await this.userController.setNewAvatar(data);
    if (!result.isError) {
      this.hideAddFilePopup();
    }
  }

  logout(): void {
    this.authController.logout();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withPageData = withStore(state => ({
  user: state.user,
  data: getUserProfilePageDataWithValues(state.userProfileData, state.user as TUserData),
}));

// eslint-disable-next-line
// @ts-ignore
export const UserProfilePage = withPageData(UserProfileBlock);
