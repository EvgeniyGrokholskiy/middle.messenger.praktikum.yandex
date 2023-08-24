import Block from '../../utils/block';
import template from './newMessageBlock.hbs';

type TProps = {

};

export class NewMessageBlock extends Block {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}