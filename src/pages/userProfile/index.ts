import Block from '../../utils/block';
import template from './userProfile.hbs';
import { Wrapper } from '../../components/wrapper';
import { exitFromUserProfile } from '../../utils/helpers';
import { userProfilePage } from '../../common/userProfilePage';
import { UserProfileForm } from '../../components/userProfileForm';

export class UserProfile extends Block {
  constructor() {
    super({
      data: userProfilePage,
      changeUserData: userProfilePage?.userProfileChangeLinks?.changeUserData,
      changeUserPassword: userProfilePage?.userProfileChangeLinks?.changeUserPassword,
      exitFromUserProfile,
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
    });
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
    (this.refs.addAwatarWrapper as Wrapper).show();
  }

  hideAddFilePopup(): void {
    (this.refs.addAwatarWrapper as Wrapper).hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
