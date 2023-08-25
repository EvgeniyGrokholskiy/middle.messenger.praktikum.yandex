import Block from '../../utils/block';
import template from './inputBlock.hbs';
import { InputElement } from '../inputElement';
import { validate } from '../../utils/validator';
import { TInputProps } from '../../common/loginPage';

export class InputBlock extends Block {
  private state: Record<string, any> = {
    value: '',
    isValue: '',
    isValid: false,
  };

  constructor(props: TInputProps) {
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

  getIsValid(): boolean {
    return this.state.isValid;
  }

  getInputsBlocks(): Block[] {
    return Object.values(this.refs).filter(item => item instanceof InputElement);
  }

  keyUpHandler(event: Event): void {
    const { value } = event.target;
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

  setError(errorMessage: string): void {
    this.setProps({
      value: this.state.value,
      error: true,
      errorText: errorMessage,
      errorClass: 'form_input-error',
    });
  }

  clearError(): void {
    this.setProps({
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
