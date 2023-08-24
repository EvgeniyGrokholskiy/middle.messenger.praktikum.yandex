import Block from '../../utils/block';
import template from './addFile.hbs';

type TProps = {
  error: boolean;
  file: boolean;
  isShowText: boolean;
  text: string;
  accept: string;
  onClick: () => void;
  addFileError: boolean;
  events: {
    click: () => void;
  };
};

export class AddFile extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
