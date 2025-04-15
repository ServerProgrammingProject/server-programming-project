const authRouter = require('./routers/authRouter.js');
const { PORT } = require('./config.js');
const ServerUtil = require('./utils/serverUtil.js');

const bootstrap = () => {
  const app = ServerUtil.create({ staticPath: './client' });
  
  app.use('/auth', authRouter);
  app.listen(PORT, () => console.log(`running on ${PORT}`));
}

bootstrap();