import Block from '../../utils/block';
import template from './newMessageBlock.hbs';

export class NewMessageBlock extends Block {
  constructor(props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
