const HttpError = require('../error.js');
const User = require('../models/user.js');
const JwtUtil = require('../utils/jwtUtil.js');

class AuthService {
  /**
   * @param {string} email
   * @param {string} password
   * @returns {string} accessToken
   */
  static signup(email, password) {
    if (!email || !password) throw new HttpError(400, '요청이 잘못되었습니다.');
    if (User.findByEmail(email)) throw new HttpError(409, '이미 등록된 이메일입니다.');
    const id = User.create(email, password);
    return JwtUtil.sign(id);
  }

  /**
   * @param {string} email 
   * @param {string} password 
   * @returns {string} accessToken
   */
  static signin(email, password) {
    if (!email || !password) throw new HttpError(400, '요청이 잘못되었습니다.');
    if (!User.findByEmail(email)) throw new HttpError(404, '존재하지 않는 사용자입니다.');
    const user = User.findByEmailPassword(email, password);
    if (user) return JwtUtil.sign(user.id);
    throw new HttpError(401, '비밀번호가 틀렸습니다');
  }
}

module.exports = AuthService;