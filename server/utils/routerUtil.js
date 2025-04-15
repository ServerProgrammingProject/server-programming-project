const express = require('express');
const HttpError = require('../error');

/** @typedef {express.Router & {path: string}} RouterExtended */
class RouterUtil {
  /**
   * @param {express.Handler} handler 
   * @returns {express.Handler}
   */
  static createErrorBoundary = (handler) => {
    return ((req, res) => {
      try {
        handler(req, res);
      } catch (e) {
        if (e instanceof HttpError) {
          return res.status(e.status).json({ message: e.message });
        } else {
          return res.status(500).json({ message: e.toString() });
        }
      }
    });
  }
  
  /**
   * @param {string} path
   * @returns {RouterExtended}
   */
  static createRouter = (path) => {
    /** @type {RouterExtended} */
    const router = express.Router();
    /** @type {Array<keyof express.Router>} */
    const methods = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
  
    methods.forEach(method => {
      /** @type {express.IRouterMatcher<express.Router>} */
      const original = router[method].bind(router);
      router[method] = (path, handler) => original(path, this.createErrorBoundary(handler));
    });

    router.path = path;
  
    return router;
  };
}

module.exports = RouterUtil;