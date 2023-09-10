import Block from '../../utils/block';
import template from './errorMessage.hbs';

type TErrorMessageProps = {
  errorMessage: string;
};

class ErrorMessage extends Block<TErrorMessageProps> {
  constructor(props: TErrorMessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  public show() {
    super.show();
  }

  public hide() {
    super.hide();
  }
}

export default ErrorMessage;
