import Block from '../../utils/block';
import template from './unreadMessageIndicator.hbs';

type TProps = {
  number: number;
};

export class UnreadMessageIndicator extends Block {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
