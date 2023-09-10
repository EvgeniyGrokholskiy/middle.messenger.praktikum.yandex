import Block from '../../utils/block';
import template from './registration.hbs';
import { IStore } from '../../utils/store';
import { withStore } from '../../utils/withStore';
import authController from '../../controllers/auth';
import { TSignupRequestData } from '../../api/types';
import { renderLoginPage } from '../../utils/helpers';
import ErrorMessage from '../../components/errorMessage';

export class Registration extends Block {
  constructor(props: any) {
    super({
      ...props,
      callbackToButton: (data: TSignupRequestData) => this.signup(data),
      callbackToLink: renderLoginPage,
    });
  }

  async signup(data: TSignupRequestData) {
    const result = await authController.signup(data);
    if (result.isError) {
      (this.refs.loginErrorMessage as ErrorMessage).setProps({ errorMessage: result.errorMessage });
      (this.refs.loginErrorMessage as ErrorMessage).show();
      setTimeout(() => (this.refs.loginErrorMessage as ErrorMessage).hide(), 5000);
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withData = withStore((state: IStore) => ({ ...state.registrationPageData }));

export const registrationPage = withData(Registration);
