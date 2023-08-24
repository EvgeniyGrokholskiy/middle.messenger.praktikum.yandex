import Block from '../../utils/block';
import template from './404.hbs';
import { renderChatPage } from '../../utils/helpers';

export class Error404 extends Block {
  constructor() {
    super({
      onClick: renderChatPage,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}