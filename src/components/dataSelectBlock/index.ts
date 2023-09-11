import Block from '../../utils/block';
import template from './dataSelect.hbs';

export class DataSelectBlock extends Block {
  constructor(props: any) {
    super({
      ...props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
