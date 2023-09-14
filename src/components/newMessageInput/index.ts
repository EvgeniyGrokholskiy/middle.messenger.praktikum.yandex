import Block from '../../utils/block';
import template from './newMessageInput.hbs';
import { InputElement } from '../inputElement';
import { validate } from '../../utils/validator';

type TProps = {
  error: string;
  errorText: string;
  errorClass: string;
  class: string;
  name: string;
  placeholder: string;
  value: string;
  onBlur: () => void;
  onKeyup: (event: Event) => void;
};

const inputProps = {
  ref: 'messageInput',
  id: 'message',
  type: 'text',
  name: 'message',
  class: 'new-message font_12',
  value: '',
};

export class NewMessageInput extends Block {
  private state = {
    value: '',
    isValid: false,
  };

  constructor(props: TProps) {
    super({
      ...props,
      ...inputProps,
      onBlur: () => {
        this.validateInput();
      },
      onKeyup: (event: Event) => {
        this.keyUpHandler(event);
      },
    });
    this.state.value = props.value || '';
  }

  getInputsBlocks(): (Block | Block[])[] {
    return Object.values(this.refs).filter(item => item instanceof InputElement);
  }

  keyUpHandler(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.state.value = value;
  }

  public validateInput(): void {
    const [element] = this.getInputsBlocks() as InputElement[];
    const name = element.getName();
    const errorMessage = validate(this.state.value, name);

    if (errorMessage) {
      this.setError(errorMessage);
      this.state.isValid = false;
    } else {
      this.clearError();
      this.state.isValid = true;
    }
  }

  setError(errorMessage: string): void {
    this.setProps({
      ...this.props,
      value: this.state.value,
      error: 'true',
      errorText: errorMessage,
      errorClass: 'form_input-error',
    });
  }

  clearError(): void {
    this.setProps({
      ...this.props,
      value: this.state.value,
      error: '',
      errorText: '',
      errorClass: '',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
