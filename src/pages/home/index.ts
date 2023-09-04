import Block from '../../utils/block';
import template from './home.hbs';
import { links } from '../../common/indexPage';

export class HomePage extends Block {
  constructor() {
    super({
      links,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
