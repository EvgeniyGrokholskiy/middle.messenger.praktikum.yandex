import Block from '../../utils/block';
import template from './registration.hbs';
import { IStore } from '../../utils/store';
import { withStore } from '../../utils/withStore';
import authController from '../../controllers/auth';
import { TSignInRequestData, TSignupRequestData } from '../../api/types';
import { renderLoginPage } from '../../utils/helpers';
import ErrorMessage from '../../components/errorMessage';

type TRegistrationProps = {
  callbackToLink: (event: Event) => void;
  callbackToButton: (data: TSignInRequestData) => Promise<void>;
};

export class Registration extends Block<TRegistrationProps> {
  constructor(props: TRegistrationProps) {
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

// eslint-disable-next-line
// @ts-ignore
export const registrationPage = withData(Registration);
