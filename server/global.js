const sessionDB = {
  /**
   * @type {string[]}
   * @readonly
   */
  rooms: [],
  /**
   * @type {{id: number, email: string, password: string, balance: number}[]}
   * @readonly
   */
  users: []
};

module.exports = {
  /** @readonly */
  db: sessionDB
};
