import Block from '../../utils/block';
import template from './userProfileForm.hbs';
import { formDataLogger } from '../../utils/helpers';
import { UserProfileInputBlock } from '../userProfileInputBlock';

export class UserProfileForm extends Block {
  private state = {
    isValid: false,
  };

  constructor(props) {
    super({
      ...props,
      data: props.data,
      class: props.class,
      saveButtonInnerText: props.saveButtonInnerText,
      events: {
        submit: (event: Event) => this.submit(event),
      },
      disableEditMode: () => {
        // this.disableEditMode();
      },
    });
  }

  validateForm(): boolean {
    const inputs = this.getInputsBlocks();
    let isValid = true;

    inputs.forEach(item => {
      item.validateInput();
    });

    inputs.forEach(input => (!input.getIsValid() ? (isValid = false) : ''));

    this.state.isValid = isValid;

    return isValid;
  }

  public submit(event: Event) {
    event?.preventDefault();
    if (this.validateForm()) {
      this.logFormValue();
      this.disableEditMode();
    }
  }

  getInputsBlocks(): Block[] {
    return Object.values(this.refs).filter(item => item instanceof UserProfileInputBlock);
  }

  getFormInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};
    const refsArray = this.getInputsBlocks();

    const inputs = refsArray.map(inputBlock => inputBlock.getContent()!.querySelector('input'));

    inputs.forEach(input => (inputValues[input.name] = input.value));

    return inputValues;
  }

  logFormValue(): void {
    const inputValues = this.getFormInputValues();

    formDataLogger(inputValues);
  }

  enableEditMode(): void {
    const inputBlock = this.getInputsBlocks();
    const saveButton = this.refs.saveButtonRef;

    if (!inputBlock && !saveButton) return;

    saveButton.show();

    inputBlock.forEach(input => {
      input.element!.querySelector('input')?.removeAttribute('disabled');
    });
  }

  disableEditMode(): void {
    const inputBlock = this.getInputsBlocks();
    const saveButton = this.refs.saveButtonRef;

    if (!inputBlock && !saveButton) return;

    saveButton.hide();

    inputBlock.forEach(input => {
      input.element!.querySelector('input')?.setAttribute('disabled', 'true');
    });

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
