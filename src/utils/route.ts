import Block from './block.ts';
import { render } from './render.ts';

const isEqualStrings = (a: string, b: string): boolean => {
  return a === b;
};

export class Route {
  private block: Block | null = null;

  private pathname: string;

  private readonly BlockClass: typeof Block;

  private readonly query: string;

  constructor(pathname: string, blockClass: typeof Block, query: string) {
    this.pathname = pathname;
    this.BlockClass = blockClass;
    this.query = query;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    this.block?.componentWillUnmount();
    this.block = null;
  }

  match(pathname: string) {
    return isEqualStrings(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});

      render(this.query, this.block);
    }
  }
}
