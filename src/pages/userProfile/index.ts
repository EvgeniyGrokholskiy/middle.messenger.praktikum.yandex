import Block from '../../utils/block';
import template from './userProfile.hbs';
import { exitFromUserProfile } from '../../utils/helpers';
import { userProfilePage } from '../../common/userProfilePage';

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
      }
    });
  };

  activateUserDataEditMode() {
    this.refs.userProfileSettingBlock.hide();
    this.refs.userProfileInputBlock.enableEditMode();
  }

  activatePasswordEditMode() {
    this.refs.userProfileSettingBlock.hide();
    this.refs.userProfileInputBlockForm.hide();
    this.refs.userProfilePasswordBlockForm.show();
    this.refs.userProfilePasswordBlock.enableEditMode();
  }

  disableUserEditMode() {
    this.refs.userProfileSettingBlock.show();
  }

  disablePasswordEditMode() {
    this.refs.userProfileSettingBlock.show();
    this.refs.userProfileInputBlockForm.show();
    this.refs.userProfilePasswordBlockForm.hide();
  }

  showAddFilePopup(): void {
    this.refs.addAwatarWrapper.show();
  }

  hideAddFilePopup(): void {
    this.refs.addAwatarWrapper.hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
