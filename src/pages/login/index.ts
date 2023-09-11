import Block from '../../utils/block';
import template from './login.hbs';
import { IStore } from '../../utils/store';
import { withStore } from '../../utils/withStore';
import authController from '../../controllers/auth';
import { TSignInRequestData } from '../../api/types';
import ErrorMessage from '../../components/errorMessage';
import { renderRegisterPage } from '../../utils/helpers';

type TLoginProps = {
  callbackToLink: (event: Event) => void;
  callbackToButton: (data: TSignInRequestData) => Promise<void>;
};

class Login extends Block<TLoginProps> {
  constructor(props: TLoginProps) {
    super({
      ...props,
      callbackToLink: renderRegisterPage,
      callbackToButton: (data: TSignInRequestData) => this.login(data),
    });
  }

  async login(data: TSignInRequestData) {
    const result = await authController.login(data);
    if (result.isError) {
      (this.refs.loginErrorMessage as ErrorMessage).setProps({ errorMessage: result.errorMessage });
      (this.refs.loginErrorMessage as ErrorMessage).show();
      setTimeout(() => (this.refs.loginErrorMessage as ErrorMessage).hide(), 5000);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withPageData = withStore((state: IStore) => ({ ...state.loginPageData }));

// eslint-disable-next-line
// @ts-ignore
export const LoginPage = withPageData(Login);
