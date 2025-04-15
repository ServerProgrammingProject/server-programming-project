const { db } = require('../global.js');
const bcrypt = require('bcryptjs');

const users = db.users;

class User {
  /** @typedef {{ id: number, email: string, password: string, balance: number }} UserModel */

  /**
   * @param {string} email
   * @param {string} password
   * @returns {number} id
   */
  static create(email, password) {
    const id = users.length;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ id, email, password: hashedPassword, balance: 0 });
    return id;
  }

  /**
   * @param {string} email 
   * @returns {UserModel|undefined}
   */
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  /**
   * @param {string} email 
   * @param {string} password 
   * @returns {UserModel|undefined}
   */
  static findByEmailPassword(email, password) {
    const user = this.findByEmail(email);
    if (!user) return undefined;
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return undefined;
    }
  }
}

module.exports = User;