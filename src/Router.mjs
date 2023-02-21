import parseURL from "./URLParsers.mjs";

class Router {
  constructor() {
    this.routes = {};
  }

  createApi(path, reqName, ...handlers) {
    if (!this.routes[reqName]) this.routes[reqName] = {};

    const { unifiedPath, variables } = parseURL(path);

    if (this.routes[reqName][unifiedPath])
      throw new Error("This path already exists");

    this.routes[reqName][unifiedPath] = { handlers, variables };
    return this;
  }

  post(path, ...handlers) {
    return this.createApi(path, "POST", ...handlers);
  }

  get(path, ...handlers) {
    return this.createApi(path, "GET", ...handlers);
  }

  resolve(req, res) {
    try {
      const { unifiedPath, variables: value } = parseURL(req.url);

      const { handlers, variables: varNames } =
        this.routes[req.method][unifiedPath];

      const params = {};
      varNames.forEach((name, index) => (params[name] = value[index]));

      req.params = params;
      handlers.forEach(handler => handler(req, res));
    } catch (err) {
      res.statusCode = 404;
      res.end("Not found");
    }
  }
}

export default Router;
