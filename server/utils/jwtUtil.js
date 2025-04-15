const { JWT_SECRET } = require('../config.js');
const jwt = require('jsonwebtoken');

class JwtUtil {
  /**
   * @param {number} id 
   * @returns {string} token
   */
  static sign(id) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  };
  
  /**
   * @param {string} token 
   * @returns {number} id
   */
  static verify(token) {
    const payload =  jwt.verify(token, JWT_SECRET);
    return payload.id;
  };
}

module.exports = JwtUtil;