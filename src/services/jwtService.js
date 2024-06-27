const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function createToken(id, email, role) {
  const tokenPayload = {
    id,
    email,
    role,
  };

  const token = jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: '1d',
  });
  return token;
}

function verifyToken(token) {
  let payload;
  payload = jwt.verify(token, jwtSecret);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};
