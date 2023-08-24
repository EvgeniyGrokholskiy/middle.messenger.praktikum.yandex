import Block from '../../utils/block';
import template from './inputElement.hbs';
import { InputType } from '../../utils/validator';

type TProps = {
  for: string;
  name: string;
  value: string;
  type: string;
  disabled: boolean;
  placeholder: string;
  errorClass: string;
  onKeyup: () => void;
  onFocus: () => void;
  onBlur: () => void;
  events: {
    blur: () => void;
    focus: () => void;
    keyup: () => void;
  };
};

export class InputElement extends Block {
  constructor(props: TProps) {
    super({
      ... props,
      disabled: props.disabled,
      events: {
        blur: props.onBlur,
        keyup: props.onKeyup,
        focus: props.onFocus,
      },
    });
  };

  public getName(): InputType | '' {
    const element = this.getContent() as HTMLInputElement;

    if (element) {
      return element.name as InputType;
    }
    return '';
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
