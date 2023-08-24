import Block from '../../utils/block';
import template from './popup.hbs';

export class Popup extends Block {
  constructor(props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
