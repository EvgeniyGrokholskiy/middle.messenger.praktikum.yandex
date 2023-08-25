import Block from '../../utils/block';
import template from './userProfileInputBlock.hbs';
import { validate } from '../../utils/validator';
import { InputElement } from '../inputElement';

type TProps = {
  ref: string;
  id: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  isShowButton: boolean;
  header: string;
  error: boolean;
  errorText: string;
  class: string;
};

export class UserProfileInputBlock extends Block {
  private state: Record<string, any> = {
    value: '',
    isValid: false,
  };

  constructor(props: TProps) {
    super({
      ...props,
      onKeyup: (event: Event) => {
        this.keyUpHandler(event);
      },
      onBlur: () => {
        this.validateInput();
      },
    });
    this.state.value = this.props.value;
  }

  getIsValid() {
    return this.state.isValid;
  }

  getInputsBlocks(): Block[] {
    return Object.values(this.refs).filter(item => item instanceof InputElement);
  }

  keyUpHandler(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.state.value = value;
  }

  public validateInput(): void {
    const [element] = this.getInputsBlocks();

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

  removeDisabledProps() {
    const { element } = this;
    if (element) {
      element.removeAttribute('disabled');
    }
  }

  setError(errorMessage: string): void {
    this.setProps({
      value: this.state.value,
      error: true,
      errorText: errorMessage,
      errorClass: 'form_input-error',
    });
    this.removeDisabledProps();
  }

  clearError(): void {
    this.setProps({
      value: this.state.value,
      error: '',
      errorText: '',
      errorClass: '',
    });
    this.removeDisabledProps();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
