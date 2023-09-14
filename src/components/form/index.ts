import Block, { TEvent } from '../../utils/block';
import template from './form.hbs';
import { InputBlock } from '../inputBlock';
import { TSignInRequestData } from '../../api/types';

type TProps = {
  callbackToLink: () => void;
  callbackToButton: (data: TSignInRequestData) => void;
  events: Record<string, TEvent>;
};

export class Form extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.submit(event),
      },
    });
  }

  submit(event: Event): void {
    event.preventDefault();

    const inputs = this.getInputsBlocks() as InputBlock[];
    let isValid = true;

    inputs.forEach(item => {
      item.validateInput();
    });

    inputs.forEach(input => {
      isValid = input.getIsValid();
    });

    if (isValid) {
      const formData = this.getFormInputValues() as TSignInRequestData;
      this.props.callbackToButton(formData);
    }
  }

  getInputsBlocks(): (Block | Block[])[] {
    return Object.values(this.refs).filter(item => item instanceof InputBlock);
  }

  getFormInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};
    const refsArray = this.getInputsBlocks() as InputBlock[];

    const inputs = refsArray
      .map(inputBlock => {
        const element = inputBlock.getContent();

        if (element) {
          return element.querySelector('input');
        }
        return null;
      })
      .filter(item => !!item);

    inputs.forEach(input => {
      if (input?.name) {
        inputValues[input.name] = input.value;
      }
    });

    return inputValues;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
