const jwt = require('jsonwebtoken');
const path = require("path");
const dotenv = require("dotenv");

// 1. Load environment file based on NODE_ENV
const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const JWT_SECRET = process.env.JWT_SECRET;

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {

    if (err) return res.sendStatus(403); 

    req.user = user; // Add user data to request
    next();
  });

}

module.exports = authToken;