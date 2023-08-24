import Block from '../../utils/block';
import template from './5XX.hbs';
import { renderChatPage } from '../../utils/helpers';

export class Error5XX extends Block {
  constructor() {
    super({
      href: '',
      onClick: renderChatPage,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
