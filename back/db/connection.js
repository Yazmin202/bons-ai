const oracledb = require('oracledb');
require('dotenv').config();

const createConnection = async () => {
  return await oracledb.getConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DSN,
    configDir: process.env.WALLET_LOCATION,
    walletLocation: process.env.WALLET_LOCATION,
    walletPassword: process.env.WALLET_PASSWORD,
  });
};

module.exports = createConnection;
