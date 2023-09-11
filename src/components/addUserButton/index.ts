import Block from '../../utils/block';
import template from './addUserButton.hbs';

type TProps = {
  type: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class AddUserButton extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
