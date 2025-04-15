const express = require('express');
const http = require('http');
const { Server, Namespace } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

class ServerUtil {
  /**
   * @param {{staticPath: string, routers: import('./routerUtil').RouterExtended[] }} param0 
   * @returns {express.Express}
   */
  static create({staticPath = './static', routers = []}) {
    app.use(express.static(staticPath));
    app.use(express.json());
    routers.forEach((router) => app.use(router.path, router));
    return app;
  }

  /**
   * @param {string} id 
   * @param {number} timeout 
   * @returns {{namespace: Namespace, delete: VoidFunction}}
   */
  static createRoom(id, timeout = 600000) {
    const path = `/${id}`;
    if (io._nsps.get(path)) return null;
    const ns = io.of(path);
    let deleteTimeout = null;
    const deleteRoom = () => {
      ns.sockets.forEach((socket) => socket.disconnect(true));
      ns.removeAllListeners();
      io._nsps.delete(path);
      clearTimeout(deleteTimeout);
    };
    deleteTimeout = setTimeout(deleteRoom, timeout);
    return {
      /** @readonly */
      namespace: ns,
      /** @readonly */
      delete: deleteRoom
    };
  }
}

module.exports = ServerUtil;