import Block, { TBlock } from '../../utils/block';
import template from './chat.hbs';
import router from '../../utils/router';
import { TUserData } from '../../api/types';
import image from '../../img/messageImage.jpg';
import { APP_PATH } from '../../common/appPath';
import { withStore } from '../../utils/withStore';
import { TChatPage } from '../../common/chatPageData';
import linkChevron from '../../img/chevronRight.svg';
import { Wrapper } from '../../components/wrapper';

type TChatProps = {
  user: TUserData;
  data: TChatPage;
  charts: Record<string, string>;
  addChatPopupData: any;
  addUserPopupData: any;
  renderUserProfile: (event: Event) => void;
  messageImage: typeof image;
  linkChevron: typeof linkChevron;
  addUserPopup: (event: Event) => void;
  deleteUserPopup: (event: Event) => void;
  showAddPopup: () => void;
  hideAddPopup: () => void;
  hideAddUserPopup: () => void;
  showAddUserPopup: () => void;
  hideDeleteUserPopup: () => void;
  addNewUser: (userLogin: string) => void;
  deleteUser: (userLogin: string) => void;
};

export class Chat extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super({
      ...props,
      addChatPopupData: props.data.popupData.addChat,
      addUserPopupData: props.data.popupData.addUser,
      renderUserProfile: (event: Event) => {
        event.preventDefault();
        this.renderUserProfile();
      },
      addUserPopup: (event: Event) => {
        event.stopPropagation();
        this.showAddUserPopup();
      },
      deleteUserPopup: (event: Event) => {
        event.stopPropagation();
        this.showDeleteUserPopup();
      },
      showAddPopup: () => {
        this.showAddPopup();
      },
      hideAddPopup: () => {
        this.hideAddPopup();
      },
      showAddUserPopup: () => {
        this.showAddUserPopup();
      },
      hideAddUserPopup: () => {
        this.hideAddUserPopup();
      },
      hideDeleteUserPopup: () => {
        this.hideDeleteUserPopup();
      },
      addNewUser: (userLogin: string) => {
        this.addNewUser(userLogin);
      },
      deleteUser: (userLogin: string) => {
        this.deleteUser(userLogin);
      },
      messageImage: image,
      linkChevron,
    });
  }

  addNewUser(userLogin: string) {
    console.log(userLogin);
  }

  deleteUser(userLogin: string) {
    console.log(userLogin);
  }

  renderUserProfile() {
    router.go(APP_PATH.USER_PROFILE);
  }

  showAddPopup() {
    (this.refs.addPopupWrapper as Wrapper).show();
  }

  hideAddPopup() {
    (this.refs.addPopupWrapper as Wrapper).hide();
  }

  showAddUserPopup() {
    this.hideAddPopup();
    (this.refs.addUserPopupWrapper as Wrapper).show();
  }

  hideAddUserPopup() {
    (this.refs.addUserPopupWrapper as Wrapper).hide();
  }

  showDeleteUserPopup() {
    this.hideAddPopup();
    (this.refs.deleteUserUserPopupWrapper as Wrapper).show();
  }

  hideDeleteUserPopup() {
    (this.refs.deleteUserUserPopupWrapper as Wrapper).hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withChatStore = withStore(state => ({
  data: state.chatPageData,
  user: state.user,
  chats: state.chats,
}));

const ChatPage = withChatStore(Chat as TBlock);

export default ChatPage;
