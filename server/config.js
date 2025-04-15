require('dotenv').config();

const config = {
  /** @readonly */
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  /** @readonly */
  PORT: process.env.PORT ?? 3000
};

Object.freeze(config);

module.exports = config;