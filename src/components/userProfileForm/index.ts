import Block, { TEvent } from '../../utils/block';
import template from './userProfileForm.hbs';
import { Button } from '../button';
import { InputBlock } from '../inputBlock';
import { TUserData } from '../../api/types';
import { HTML_TAGS_ATTRIBUTES } from '../../common/const';
import { UserProfileInputBlock } from '../userProfileInputBlock';

type TProps = {
  class: string;
  userData: TUserData;
  onClick: () => void;
  isDisabledInputs: boolean;
  disableEditMode: () => void;
  saveButtonInnerText: string;
  events: Record<string, TEvent>;
  onSubmit: (event: Event) => void;
  data: Record<string, string | boolean>;
  onSubmitCallback: (data: Record<string, string>) => void;
};

export class UserProfileForm extends Block<TProps> {
  private state = {
    isValid: false,
  };

  constructor(props: TProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.submit(event),
      },
    });
  }

  validateForm(): boolean {
    const inputs = this.getInputsBlocks() as UserProfileInputBlock[];
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
      const inputValues = this.getFormInputValues();
      this.props.onSubmitCallback(inputValues);
    }
  }

  getInputsBlocks(): (Block<any> | Block[])[] {
    return Object.values(this.refs).filter(item => item instanceof UserProfileInputBlock);
  }

  getFormInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};
    const refsArray = this.getInputsBlocks() as UserProfileInputBlock[];

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

  enableEditMode(): void {
    const inputBlockWrapper = this.getInputsBlocks() as UserProfileInputBlock[];
    const saveButton = this.refs.saveButtonRef as Button;

    if (!inputBlockWrapper && !saveButton) return;

    saveButton.show();

    inputBlockWrapper.forEach(inputBlock => {
      const div = inputBlock.getContent();
      if (div) {
        div.querySelector('input')?.removeAttribute(HTML_TAGS_ATTRIBUTES.DISABLED);
      }
    });
  }

  disableEditMode(): void {
    const inputBlock = this.getInputsBlocks() as InputBlock[];
    const saveButton = this.refs.saveButtonRef as Button;

    if (!inputBlock && !saveButton) return;

    saveButton.hide();

    inputBlock.forEach(input => {
      input.element!.querySelector('input')?.setAttribute(HTML_TAGS_ATTRIBUTES.DISABLED, 'true');
    });

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
