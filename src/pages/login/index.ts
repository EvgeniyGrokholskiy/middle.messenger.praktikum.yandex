import Block from '../../utils/block';
import template from './login.hbs';
import { renderChat, renderRegisterPage } from '../../utils/helpers';
import {
  loginPageButtonData,
  loginPageInputBlockData,
  loginPageLinkData,
} from '../../common/loginPage';

export class LoginPage extends Block {
  constructor() {
    super({
      callbackToButton: renderChat,
      callbackToLink: renderRegisterPage,
      inputData: loginPageInputBlockData,
      buttonData: loginPageButtonData,
      linkData: loginPageLinkData,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
