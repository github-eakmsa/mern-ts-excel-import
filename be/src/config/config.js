
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/.env'});

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 8080,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  uploadDir:  process.env.UPLOAD_DIR,
}

module.exports = { config };

  