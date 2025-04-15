const { db } = require('../global.js');
const ServerUtil = require('../utils/serverUtil.js');

const rooms = db.rooms;

class Room {
  static create(id) {
    const ns = ServerUtil.createRoom(id);
    rooms[id] = ns;
  }
}