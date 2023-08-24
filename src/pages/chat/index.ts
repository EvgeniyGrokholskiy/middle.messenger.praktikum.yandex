import Block from '../../utils/block';
import template from './chat.hbs';
import { chatPage } from '../../common/chatPage';
import { renderUserProfile } from '../../utils/helpers';
import image from '../../img/messageImage.jpg';
import linkChevron from '../../img/chevronRight.svg';

export class Chat extends Block {
  constructor() {
    super({
      data: chatPage,
      renderUserProfile,
      messageImage: image,
      linkChevron,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
