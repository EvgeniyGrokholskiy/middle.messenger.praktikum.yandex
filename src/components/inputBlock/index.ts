import Block from '../../utils/block';
import template from './inputBlock.hbs';
import { InputElement } from '../inputElement';
import { validate } from '../../utils/validator';

export type TInputBlockProps = {
  ref: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  errorText: string;
  error: string;
  errorClass: string;
  class: string;
  onKeyup: (event: Event) => void;
  onBlur: () => void;
};

type TInputBlockState = {
  value: string;
  isValue: string;
  isValid: boolean;
};

export class InputBlock extends Block<TInputBlockProps> {
  private state: TInputBlockState = {
    value: '',
    isValue: '',
    isValid: false,
  };

  constructor(props: TInputBlockProps) {
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

  public getContent(): HTMLElement | null {
    return super.getContent();
  }

  getIsValid(): boolean {
    return this.state.isValid;
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
