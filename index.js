const Apllication = require('./app/server');
const DB_URL = "mongodb://localhost:27017/ProjectManagerDB";
require('dotenv').config();
new Apllication(3000 , DB_URL);