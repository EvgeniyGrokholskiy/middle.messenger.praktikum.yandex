import Block from '../../utils/Block';
import template from './button.hbs';

interface IButtonProps {
  innerText: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
