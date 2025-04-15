const RouterUtil = require('../utils/routerUtil.js');
const AuthService = require('../services/authService.js');

const authRouter = RouterUtil.createRouter('/auth');
authRouter.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const token = AuthService.signup(email, password);
  res.json({ access_token: token });
});
authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const token = AuthService.signin(email, password);
  res.json({ access_token: token });
});

module.exports = authRouter;