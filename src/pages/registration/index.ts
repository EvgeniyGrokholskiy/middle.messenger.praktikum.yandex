import Block from '../../utils/block';
import template from './registration.hbs';

import { renderLogin, renderLoginPage } from '../../utils/helpers';
import {
  registrationInputsBlockData,
  registrationPageButtonData,
  registrationPageLinkData,
} from '../../common/registrationPage';

export class Registration extends Block {
  constructor() {
    super({
      inputData: registrationInputsBlockData,
      buttonData: registrationPageButtonData,
      linkData: registrationPageLinkData,
      callbackToButton: renderLogin,
      callbackToLink: renderLoginPage,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
