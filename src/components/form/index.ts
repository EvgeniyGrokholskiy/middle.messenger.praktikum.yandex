import Block from '../../utils/block';
import template from './form.hbs';
import { formDataLogger } from '../../utils/helpers';
import { InputBlock } from '../inputBlock';

type TProps = {
  events: Record<string, any>;
};

export class Form extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.submit(event),
      },
    });
  }

  submit(event: Event): void {
    const inputs = this.getInputsBlocks();
    let isValid = true;

    inputs.forEach(item => {
      item.validateInput();
    });

    inputs.forEach(input => {
      isValid = input.getIsValid();
    });

    event.preventDefault();
    if (isValid) {
      this.logFormValue();
    }
  }

  getInputsBlocks(): Block[] {
    return Object.values(this.refs).filter(item => item instanceof InputBlock);
  }

  getFormInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};
    const refsArray = this.getInputsBlocks();

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

  logFormValue(): void {
    const inputValues = this.getFormInputValues();

    formDataLogger(inputValues);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
