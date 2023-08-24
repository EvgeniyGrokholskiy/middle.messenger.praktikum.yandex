import Block from '../../utils/block';
import template from './addUserButton.hbs';

type TProps = {
  type: string;
  onClick: () => void;
  events: {
    onclick: () => void;
  };
};

export class AddUserButton extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        onclick: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
