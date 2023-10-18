import Block from './block.ts';
import { Route } from './route.ts';
import { APP_PATH } from '../common/appPath.ts';

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
      this.history.pushState({}, '', APP_PATH.ERROR_404);
      this._onRoute(APP_PATH.ERROR_404);
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
