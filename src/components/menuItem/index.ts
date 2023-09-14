import Block from '../../utils/block';
import template from './menuItem.hbs';

type TMenuItemProps = {
  buttonText: string;
  altText: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class MenuItem extends Block<TMenuItemProps> {
  constructor(props: TMenuItemProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
