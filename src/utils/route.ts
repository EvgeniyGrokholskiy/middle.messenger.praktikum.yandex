// import Block from './block';
// import { render } from './render';
// import { isEqual } from './helpers';
//
// type TProps = {
//   pathname: string;
//   view: typeof Block;
//   props: string;
// };
//
// export interface IRoute {
//   navigate(pathname: string): void;
//   leave(): void;
//   match(pathname: string): void;
//   render(): void;
// }
//
// class Route implements IRoute {
//   private _pathname: string;
//   private _blockClass: typeof Block;
//   private _block: typeof Block;
//   private _props: Record<string, unknown>;
//
//   constructor(pathname: string, view: string, props: Record<string, unknown>) {
//     this._pathname = pathname;
//     this._blockClass = view;
//     this._block = null;
//     this._props = props;
//   };
//
//   navigate(pathname: string) {
//     if (this.match(pathname)) {
//       this._pathname = pathname;
//       this.render();
//     }
//   };
//
//   leave() {
//     if (this._block) {
//       this._block.hide();
//     }
//   };
//
//   match(pathname: string) {
//     return isEqual(pathname, this._pathname);
//   };
//
//   render() {
//     if (!this._block) {
//       this._block = new this._blockClass(this._props);
//       render(this._block);
//       return;
//     }
//
//     this._block.show();
//   };
// };

//
// export default class Route {
//   private _pathname: string;
//   private readonly _blockClass: typeof Block | null;
//   private _block: Block | null;
//   private _props: Record<string, string>;
//
//
//   constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
//     this._pathname = pathname;
//     this._blockClass = view;
//     this._block = null;
//     this._props = props;
//   }
//
//   navigate(pathname: string): void {
//     if (this.match(pathname)) {
//       this._pathname = pathname;
//       this.render(this._block, pathname);
//     }
//   }
//
//   match(pathname) {
//     return isEqual(pathname, this._pathname);
//   }
//
//   leave() {
//     if (this._block) {
//       this._block.hide();
//     }
//   }
//
//   render(route: typeof Block<{}>, pathName: string) {
//     if (!this._block) {
//       this._block = new route;
//       render(this._props.rootQuery, this._block);
//       return;
//     }
//
//     this._block.show();
//   }
// }

import Block from './block';
import { render } from './render';

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
