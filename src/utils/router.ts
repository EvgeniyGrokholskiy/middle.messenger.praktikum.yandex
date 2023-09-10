// class Router {
//   constructor(rootQuery) {
//     if (Router.__instance) {
//       return Router.__instance;
//     }
//
//     this.routes = [];
//     this.history = window.history;
//     this._currentRoute = null;
//     this._rootQuery = rootQuery;
//
//     Router.__instance = this;
//   }
//
//   use(pathname, block) {
//     const route = new Route(pathname, block, {rootQuery: this._rootQuery});
//
//     this.routes.push(route);
//
//     return this;
//   }
//
//   start() {
//     window.onpopstate = (event => {
//       this._onRoute(event.currentTarget.location.pathname);
//     }).bind(this);
//
//     this._onRoute(window.location.pathname);
//   }
//
//   _onRoute(pathname) {
//     const route = this.getRoute(pathname);
//     if (!route) {
//       return;
//     }
//
//     if (this._currentRoute && this._currentRoute !== route) {
//       this._currentRoute.leave();
//     }
//
//     this._currentRoute = route;
//     route.render(route, pathname);
//   }
//
//   go(pathname) {
//     this.history.pushState({}, '', pathname);
//     this._onRoute(pathname);
//   }
//
//   back() {
//     this.history.back();
//   }
//
//   forward() {
//     this.history.forward();
//   }
//
//   getRoute(pathname) {
//     return this.routes.find(route => route.match(pathname));
//   }
// }

// class Router {
//   routes: Route[];
//   history: History;
//   _currentRoute: Route[] | null = null;
//   _rootQuery: string;
//   private static __instance: Router;
//
//   constructor(rootQuery: any) {
//     if (Router.__instance) {
//       return Router.__instance;
//     }
//
//     this.routes = [];
//     this.history = window.history;
//     this._currentRoute = null;
//     this._rootQuery = rootQuery;
//
//     Router.__instance = this;
//   }
//
//   use(pathname: string, block: typeof Block): Router {
//     const route = new Route(pathname, block, {rootQuery: this._rootQuery});
//
//     this.routes.push(route);
//
//     return this;
//   }
//
//   start() {
//     // Реагируем на изменения в адресной строке и вызываем перерисовку
//     window.onpopstate = (event: PopStateEvent) => {
//       const window = event.currentTarget as Window;
//       this._onRoute(window.location.pathname);
//     };
//
//     this._onRoute(window.location.pathname);
//   }
//
//   _onRoute(pathname: string): void {
//     const route = this.getRoute(pathname);
//     if (!route) {
//       return;
//     }
//
//     if (this._currentRoute) {
//       this._currentRoute.leave();
//     }
//
//     route.render(route as any, pathname);
//   }
//
//   go(pathname: string) {
//     this.history.pushState({}, "", pathname);
//     this._onRoute(pathname);
//   }
//
//   getRoute(pathname: string) {
//     return this.routes.find(route => route.match(pathname));
//   }
// }
//
// export default Router;

import Block from './block';
import { Route } from './route';

class Router {
  private static _instance: Router;

  private routes: Route[];

  private currentRoute: Route | null = null;

  private history: History = window.history;

  private rootQuery: string;

  constructor(rootQuery: string) {
    if (Router._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    this.rootQuery = rootQuery;
    this.routes = [];
  }

  static getInstance(rootQuery: string) {
    if (!Router._instance) {
      this._instance = new Router(rootQuery);
    }
    return this._instance;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

const router = Router.getInstance('#app');

export type TRouter = typeof router;

export default router;
