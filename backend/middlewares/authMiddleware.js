const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.development' });

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: 'Token missing or malformed'});
  }
  const token = authHeader.split(' ')[1];
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  }catch (err){
    return res.status(401).json({message: 'Invalid or expired token'})
  }
  console.log("bisa4");
}

module.exports = verifyToken;